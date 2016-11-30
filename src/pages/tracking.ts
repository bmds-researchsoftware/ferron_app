import { FerronSqlite } from '../native-plugins/ferron-sqlite.service';

export class Tracking {
  constructor(public sqlite: FerronSqlite) {}

  public recordNav(pageName: string, buttonLabel: string) {
    this.sqlite.initialize().then(() => {
      this.sqlite.persist('button_presses', {
        button_label: buttonLabel,
        current_page: pageName
      });
    });
  }
}
