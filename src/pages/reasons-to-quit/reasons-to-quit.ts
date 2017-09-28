import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';

@Component({
  templateUrl: 'reasons-to-quit.html',
})
export class ReasonsToQuitPage {
  public additionalResponse = {
    uuid: null,
    text: null
  };
  public reasons = [
    {
      text: 'I want more energy',
      checked: false
    },
    {
      text: 'I want to live a healthy life',
      checked: false
    },
    {
      text: 'I want to lower my risk of health problems',
      checked: false
    },
    {
      text: 'I want to lower my risk of cancer',
      checked: false
    },
    {
      text: 'I want to lower my risk of stroke',
      checked: false
    },
    {
      text: 'I want to protect my kids from secondhand smoke and illnesses',
      checked: false
    },
    {
      text: 'I want to protect my pets from secondhand smoke and illnesses',
      checked: false
    },
    {
      text: 'I want to keep up with my kids',
      checked: false
    },
    {
      text: 'I want to get in shape',
      checked: false
    },
    {
      text: 'I promised myself I would quit',
      checked: false
    },
    {
      text: 'I believe I can quit',
      checked: false
    },
    {
      text: "I'm tired of getting bronchitis",
      checked: false
    },
    {
      text: 'I want to improve my lung health',
      checked: false
    },
    {
      text: 'I want smoother skin',
      checked: false
    },
    {
      text: 'I want cleaner teeth',
      checked: false
    },
    {
      text: 'I want to smell good',
      checked: false
    },
    {
      text: 'I want to save money for other things',
      checked: false
    },
    {
      text: 'I want to be free from my addiction to nicotine',
      checked: false
    },
    {
      text: 'I want to live longer',
      checked: false
    },
    {
      text: 'I want to be in control of my life',
      checked: false
    },
    {
      text: 'I want to avoid a fire',
      checked: false
    },
    {
      text: "I don't want my house to smell bad",
      checked: false
    }
  ]
  public sortedReasons: Promise<{}>;
  public RESPONSES_TABLE = 'reason_to_quit_responses';
  public saveEnabled = false;

  private MAX_SELECTIONS = 3;

  constructor(
    public nav: NavController,
    public sqlite: FerronSqlite
  ) {
    this.sqlite.initialize().then(() => {
      this.refreshSelections();
    })
  }

  public isUpdateable(isChecked) {
    if (isChecked === true) {
      return true;
    }

    return this.reasons.filter(reason => {
      return reason.checked === true;
    }).length < this.MAX_SELECTIONS;
  }

  public isSaved(isChecked) {
    if (this.saveEnabled === true) {
      return false;
    }

    return isChecked === true;
  }

  public refreshSelections() {
    this.sortedReasons = this.sqlite.fetchAll(this.RESPONSES_TABLE).then(responses => {
      if (responses.length === 0) {
        this.saveEnabled = true;
      }

      responses.forEach(selection => {
        let reasonIndex = this.reasons.findIndex(reason => {
          return reason.text === selection.reason_to_quit_title;
        });

        if (reasonIndex === -1) {
          this.additionalResponse.text = selection.reason_to_quit_title;
          this.additionalResponse.uuid = selection.uuid;
        } else {
          this.reasons[reasonIndex].checked = true;
        }
      });

      return this.reasons;
    });
  }

  public saveResponses() {
    this.saveEnabled = false;
    this.reasons.forEach(reason => {
      if (reason.checked === true) {
        this.sqlite.persist(this.RESPONSES_TABLE, {
          reason_to_quit_title: reason.text
        });
      }
    });
    this.refreshSelections();
  }

  public saveAdditionalResponse() {
    this.sqlite.persist(this.RESPONSES_TABLE, {
      uuid: this.additionalResponse.uuid,
      reason_to_quit_title: this.additionalResponse.text
    });
  }
}
