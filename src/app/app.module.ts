import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { FerronApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ConfigurationPage } from '../pages/configuration/configuration.page';
import { CopingSkillsPage } from '../pages/coping-skills/coping-skills';
import { LearnPage } from '../pages/learn/learn';
import { ListenPage } from '../pages/listen/listen.page';
import { PromptsGetMotivatedTipPage } from '../pages/prompts/prompts-get-motivated-tip.page';
import { Store } from '../store/store.service';
import { AuthenticationTokens } from '../pages/configuration/authentication-tokens.service';
import { Constants } from '../constants.service';
import { FerronAppVersion } from '../native-plugins/ferron-app-version.service';
import { FerronDevice } from '../native-plugins/ferron-device.service';
import { FerronLocalNotifications } from '../native-plugins/ferron-local-notifications.service';
import { FerronNetwork } from '../native-plugins/ferron-network.service';
import { FerronSqlite } from '../native-plugins/ferron-sqlite.service';
import { NicotineReplacementPage } from '../pages/nicotine-replacement/nicotine-replacement.page';
import { PromptsLearnASkillPage } from '../pages/prompts/prompts-learn-a-skill.page';
import { PromptsPositiveFeedbackPage } from '../pages/prompts/prompts-positive-feedback.page';
import { PromptsQuitTipPage } from '../pages/prompts/prompts-quit-tip.page';
import { PromptsTryingToQuitPage } from '../pages/prompts/prompts-trying-to-quit.page';
import { PromptsPage } from '../pages/prompts/prompts.page';
import { ReasonsToQuitPage } from '../pages/reasons-to-quit/reasons-to-quit';
import { RemindersPage } from '../pages/reminders/reminders';
import { BundledVideoPage, StreamingVideoPage, WatchPage } from '../pages/watch/watch.page';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    FerronApp,
    AboutPage,
    BundledVideoPage,
    ConfigurationPage,
    HomePage,
    CopingSkillsPage,
    LearnPage,
    ListenPage,
    NicotineReplacementPage,
    PromptsGetMotivatedTipPage,
    PromptsLearnASkillPage,
    PromptsPositiveFeedbackPage,
    PromptsQuitTipPage,
    PromptsTryingToQuitPage,
    PromptsPage,
    ReasonsToQuitPage,
    RemindersPage,
    StreamingVideoPage,
    WatchPage
  ],
  imports: [
    IonicModule.forRoot(FerronApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    FerronApp,
    AboutPage,
    BundledVideoPage,
    ConfigurationPage,
    HomePage,
    CopingSkillsPage,
    LearnPage,
    ListenPage,
    NicotineReplacementPage,
    PromptsGetMotivatedTipPage,
    PromptsLearnASkillPage,
    PromptsPositiveFeedbackPage,
    PromptsQuitTipPage,
    PromptsTryingToQuitPage,
    PromptsPage,
    ReasonsToQuitPage,
    RemindersPage,
    StreamingVideoPage,
    WatchPage
  ],
  providers: [
    AuthenticationTokens,
    Constants,
    FerronAppVersion,
    FerronDevice,
    FerronLocalNotifications,
    FerronNetwork,
    FerronSqlite,
    Store
  ]
})
export class AppModule {}
