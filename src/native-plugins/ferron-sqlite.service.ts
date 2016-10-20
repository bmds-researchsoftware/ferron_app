import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';

const TABLES: Table[] = [
  {
    columns: [
      ['uuid', 'VARCHAR(36) PRIMARY KEY'],
      ['value', 'VARCHAR(64)']
    ],
    isSyncable: false,
    name: 'authentication_tokens'
  },
  {
    columns: [
      ['uuid', 'VARCHAR(36) PRIMARY KEY'],
      ['client_created_at', 'INTEGER'],
      ['client_updated_at', 'INTEGER'],
      ['is_dirty', 'INTEGER'],
      ['current_page', 'VARCHAR(64)'],
      ['button_label', 'VARCHAR(64)']
    ],
    isSyncable: true,
    name: 'button_presses'
  },
  {
    columns: [
      ['uuid', 'VARCHAR(36) PRIMARY KEY'],
      ['client_created_at', 'INTEGER'],
      ['client_updated_at', 'INTEGER'],
      ['device_uuid', 'VARCHAR(64)'],
      ['device_version', 'VARCHAR(64)'],
      ['is_dirty', 'INTEGER'],
      ['manufacturer', 'VARCHAR(64)'],
      ['model', 'VARCHAR(64)'],
      ['platform', 'VARCHAR(64)']
    ],
    isSyncable: true,
    name: 'devices'
  },
  {
    columns: [
      ['uuid', 'VARCHAR(36) PRIMARY KEY'],
      ['client_created_at', 'INTEGER'],
      ['client_updated_at', 'INTEGER'],
      ['is_dirty', 'INTEGER'],
      ['body', 'VARCHAR(1024)']
    ],
    isSyncable: true,
    name: 'quit_tips'
  },
  {
    columns: [
      ['uuid', 'VARCHAR(36) PRIMARY KEY'],
      ['client_created_at', 'INTEGER'],
      ['client_updated_at', 'INTEGER'],
      ['is_dirty', 'INTEGER'],
      ['hour', 'VARCHAR(2)'],
      ['minute', 'VARCHAR(2)']
    ],
    isSyncable: true,
    name: 'reminders'
  },
  {
    columns: [
      ['uuid', 'VARCHAR(36) PRIMARY KEY'],
      ['client_created_at', 'INTEGER'],
      ['client_updated_at', 'INTEGER'],
      ['is_dirty', 'INTEGER'],
      ['identifier', 'VARCHAR(64)'],
      ['title', 'VARCHAR(64)']
    ],
    isSyncable: true,
    name: 'videos'
  },
  {
    columns: [
      ['uuid', 'VARCHAR(36) PRIMARY KEY'],
      ['client_created_at', 'INTEGER'],
      ['client_updated_at', 'INTEGER'],
      ['is_dirty', 'INTEGER'],
      ['did_try_skill', 'INTEGER'],
      ['did_like_video', 'INTEGER'],
      ['confidence_in_coping', 'INTEGER'],
      ['video_title', 'VARCHAR(64)']
    ],
    isSyncable: true,
    name: 'video_follow_up_responses'
  }
];

export interface Table {
  columns: string[][];
  isSyncable: boolean;
  name: string;
}

let synchronizerTimeoutId: number;

/* istanbul ignore next: developer laziness */
function cloneRecord(record): any {
  let newRecord = {};

  for (let attr in record) {
    if (record.hasOwnProperty(attr)) {
      newRecord[attr] = record[attr];
    }
  }

  return newRecord;
}

/* istanbul ignore next: developer laziness */
function convertToAttributes(resourceDatum) {
  let datum = cloneRecord(resourceDatum.attributes);
  const ISO8601 = /\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d\d\dZ/;
  for (let attr in datum) {
    if (typeof datum[attr] === 'string' &&
        datum[attr].match(ISO8601) != null) {
      datum[attr] = new Date(datum[attr]);
    }
  }
  datum.uuid = resourceDatum.id;

  return datum;
}

@Injectable()
export class FerronSqlite {
  public DB_NAME = 'calmcopequit.db';
  public DB_LOCATION = 'default';
  public cbit;
  public periodInMS = 30 * 1000;
  public network = {
    hasConnection() { return true; }
  };
  public Payload;
  public lastFetchTimestamp = null;
  public db = new SQLite();

  /* istanbul ignore next: developer laziness */
  public initialize() {
    this.cbit = (<any> window).cbit;

    return this.establishConnection().then(() => {
      return this.prepareDatabase();
    });
  }

  /* istanbul ignore next: developer laziness */
  public prepareDatabase(): Promise<any> {
    if (this.db == null) {
      alert('database is not usable in this context');
      return Promise.reject('error');
    } else {
      return Promise.all(
        TABLES.map(table => {
          return this.createTable(table.name, table.columns);
        })
      );
    }
  }

  /* istanbul ignore next: developer laziness */
  public fetch(table, uuid): Promise<any> {
    let query = 'SELECT * FROM ' + table + ' WHERE uuid = ?';

    return this.db.executeSql(query, [uuid]).then(rs => {
      return rs.rows.item(0);
    });
  }

  /* istanbul ignore next: developer laziness */
  public fetchAll(table): Promise<any> {
    let query = 'SELECT * FROM ' + table;

    return this.db.executeSql(query, []).then(rs => {
      console.log('query ran successfully: ' + query);
      let items = [];

      for (let i = 0; i < rs.rows.length; i++) {
        items.push(rs.rows.item(i));
      }

      return items;
    });
  }

  /* istanbul ignore next: developer laziness */
  public fetchAllDirty(table): Promise<any> {
    let query = 'SELECT * FROM ' + table + ' WHERE is_dirty = 1';

    return this.db.executeSql(query, []).then(rs => {
      let items = [];

      for (let i = 0; i < rs.rows.length; i++) {
        let record = cloneRecord(rs.rows.item(i));
        delete record.is_dirty;

        items.push(record);
      }

      return items;
    }).catch(error => {
      console.log(error);
    });
  }

  /* istanbul ignore next: developer laziness */
  public first(table): Promise<any> {
    let query = 'SELECT * FROM ' + table + ' LIMIT 1';

    return this.db.executeSql(query, []).then(rs => {
      return rs.rows.item(0);
    });
  }

  /* istanbul ignore next: developer laziness */
  public run() {
    this.stop();
    this.synchronize().then(() => {
      synchronizerTimeoutId = setTimeout(
        this.run.bind(this),
        this.periodInMS
      );
    });
  }

  // insert or update if the uuid exists
  /* istanbul ignore next: developer laziness */
  public persist(table: string, data: any): Promise<any> {
    let schema = this.getTable(table);
    let query = 'INSERT OR REPLACE INTO ' + table + ' (' +
                schema.columns.map(column => { return column[0]; }).join(', ') +
                ') VALUES (' +
                schema.columns.map(column => { return '?'; }).join(', ') +
                ')';
    let providedValues = {
      client_created_at: Date.now(),
      client_updated_at: Date.now(),
      is_dirty: 1,
      uuid: data.uuid || this.cbit.uuid()
    };
    let dataValues = this.getTable(table)
                     .columns
                     .map(column => {
                       return providedValues[column[0]] || data[column[0]];
                      });

    return this.db.executeSql(query, dataValues).then((_) => {
      console.log('query ran successfully: ' + query);
    }).catch(error => {
      console.log(error);
    });
  }

  /* istanbul ignore next: developer laziness */
  public markClean(table: string, recordUuids: string[]): Promise<any> {
    let query = 'UPDATE ' + table + ' SET is_dirty = 0 WHERE uuid IN (' +
                recordUuids.map(_ => { return '?'; }).join(', ') + ')';

    return this.db.executeSql(query, recordUuids).then(_ => {
      console.log('query ran successfully: ' + query);
    }).catch(error => {
      console.log(error);
    });
  }

  /* istanbul ignore next: developer laziness */
  public setPeriod(period): FerronSqlite {
    this.periodInMS = period;

    return this;
  }

  /* istanbul ignore next: developer laziness */
  public setNetwork(network): FerronSqlite {
    this.network = network;

    return this;
  }

  /* istanbul ignore next: developer laziness */
  public setPayloadResource(Payload): FerronSqlite {
    this.Payload = Payload;

    return this;
  }

  /* istanbul ignore next: developer laziness */
  public setLastFetchTimestamp(timestamp): FerronSqlite {
    this.lastFetchTimestamp = timestamp;

    return this;
  }

  /* istanbul ignore next: developer laziness */
  public getTable(name): { columns: string[][], name: string } {
    return TABLES.filter(table => {
      return table.name === name;
    })[0];
  }

  /* istanbul ignore next: developer laziness */
  public establishConnection() {
    return this.db.openDatabase({
      location: this.DB_LOCATION,
      name: this.DB_NAME
    }).catch(error => {
      if (error instanceof ReferenceError) {
        alert('database is not usable in this context');
      }
    });
  }

  /* istanbul ignore next: developer laziness */
  public createTable(table: string, columns: string[][]): Promise<any> {
    let columnDefs = columns.map(column => { return column.join(' '); });

    return this.db.executeSql('CREATE TABLE IF NOT EXISTS ' +
                              table +
                              ' (' + columnDefs.join(', ') + ')', []);
  }

  /* istanbul ignore next: developer laziness */
  public stop() {
    clearTimeout(synchronizerTimeoutId);
    synchronizerTimeoutId = null;
  }

  /* istanbul ignore next: developer laziness */
  public synchronize(): Promise<any> {
    if (!this.network.hasConnection()) {
      return;
    }

    let persistPayload = Object.create(this.Payload);
    let fetchPayload = Object.create(this.Payload);

    return this.transmitDirtyData(persistPayload)
           .then(() => {
             return this.fetchData(fetchPayload);
           });
  }

  /* istanbul ignore next: developer laziness */
  public transmitDirtyData(payload): Promise<any> {
    let tables = TABLES.filter(table => {
      return table.isSyncable === true;
    });

    return Promise.all(tables.map(table => {
             return this.collectDirtyData(table);
           }))
           .then((dirtyData: any[]) => {
             if (dirtyData.some(d => { return d.length > 0; })) {
               let flatData = dirtyData.reduce((a, b) => {
                 return a.concat(b);
               }, []);

               return payload.setData(flatData).persist();
             }

             return { data: [] };
           })
           .then(response => {
             if (response.data.length === 0) { return; }

             this.markClean(response.data[0].type, response.data.map(d => {
               return d.id;
             }));
           });
  }

  /* istanbul ignore next: developer laziness */
  public collectDirtyData(table: Table): Promise<any[]> {
    return this.fetchAllDirty(table.name).then(dirtyRecords => {
      return dirtyRecords.map(dirtyRecord => {
        dirtyRecord.type = table.name;

        return dirtyRecord;
      });
    });
  }

  /* istanbul ignore next: developer laziness */
  public fetchData(payload) {
    let filter = this.lastFetchTimestamp == null ? null : { gt: this.lastFetchTimestamp };

    return payload.fetch(filter).then(response => {
      response.data.forEach(resourceDatum => {
        return this.persistClean(resourceDatum);
      });

      if (response.meta != null) {
        this.setLastFetchTimestamp(response.meta.timestamp);
      }
    });
  }

  /* istanbul ignore next: developer laziness */
  public persistClean(resourceDatum) {
    let datum = convertToAttributes(resourceDatum);

    this.persist(resourceDatum.type, datum).then(() => {
      this.markClean(resourceDatum.type, [datum.uuid]);
    });
  }
}
