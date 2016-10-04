import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'reasons-to-quit.html',
})
export class ReasonsToQuitPage {
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

  private MAX_SELECTIONS = 3;

  constructor(public nav: NavController) {}

  public isUpdateable(isChecked) {
    if (isChecked === true) {
      return true;
    }

    return this.reasons.filter(reason => {
      return reason.checked === true;
    }).length < this.MAX_SELECTIONS;
  }
}
