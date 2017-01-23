/*import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { ListenPage } from '../../pages/listen/listen.page';
import { WatchPage } from '../../pages/watch/watch.page';
import { PromptsLearnASkillPage } from './prompts-learn-a-skill.page';
import { TestBed, inject } from '@angular/core/testing';
import { NavController } from 'ionic-angular';

describe('PromptsLearnASkillPage', () => {
  let stubNavController = { push: jasmine.createSpy('push') };
  let stubSqlite = {
    initialize() { return Promise.resolve(); },
    persist: jasmine.createSpy('persist')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromptsLearnASkillPage],
      providers: [
        { provide: NavController, useValue: stubNavController },
        { provide: FerronSqlite, useValue: stubSqlite }
      ]
    });
  });

  describe('#goListen', () => {
    it('navigates to the ListenPage', inject([PromptsLearnASkillPage], (promptsLearnASkillPage) => {
      promptsLearnASkillPage.goListen();

      expect(stubNavController.push).toHaveBeenCalledWith(ListenPage);
    }));

    it('records the button press', inject([PromptsLearnASkillPage], (promptsLearnASkillPage) => {
      promptsLearnASkillPage.goListen();

      expect(stubSqlite.persist).toHaveBeenCalledWith('button_presses', {
        button_label: 'Listen to learn',
        current_page: 'Learn a skill'
      });
    }));
  });

  describe('#goWatch', () => {
    it('navigates to the WatchPage', inject([PromptsLearnASkillPage], (promptsLearnASkillPage) => {
      promptsLearnASkillPage.goWatch();

      expect(stubNavController.push).toHaveBeenCalledWith(WatchPage);
    }));

    it('records the button press', inject([PromptsLearnASkillPage], (promptsLearnASkillPage) => {
      promptsLearnASkillPage.goWatch();

      expect(stubSqlite.persist).toHaveBeenCalledWith('button_presses', {
        button_label: 'Watch to learn',
        current_page: 'Learn a skill'
      });
    }));
  });
});*/
