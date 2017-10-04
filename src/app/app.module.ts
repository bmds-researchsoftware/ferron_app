import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FerronApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { AudioFollowUpPage } from '../pages/listen/audio-follow-up.page';
import { ConfigurationPage } from '../pages/configuration/configuration.page';
import { CopingSkillsPage } from '../pages/coping-skills/coping-skills';
import { LearnPage } from '../pages/learn/learn';
import { BundledAudioPage } from '../pages/listen/bundled-audio.page';
import { ListenPage } from '../pages/listen/listen.page';
import { PromptsGetMotivatedTipPage } from '../pages/prompts/prompts-get-motivated-tip.page';
import { Store } from '../store/store.service';
import { AuthenticationTokens } from '../pages/configuration/authentication-tokens.service';
import { Constants } from '../constants.service';
import { FerronAppVersion } from '../native-plugins/ferron-app-version.service';
import { FerronDevice } from '../native-plugins/ferron-device.service';
import { FerronDialogs } from '../native-plugins/ferron-dialogs.service';
import { FerronLocalNotifications } from '../native-plugins/ferron-local-notifications.service';
import { FerronNetwork } from '../native-plugins/ferron-network.service';
import { FerronSqlite } from '../native-plugins/ferron-sqlite.service';
import { FerronToast } from '../native-plugins/ferron-toast.service';
import { NicotineReplacementPage } from '../pages/nicotine-replacement/nicotine-replacement.page';
import { OneStepAtATimePage } from '../pages/one-step-at-a-time/one-step-at-a-time.page';
import { PromptsLearnASkillPage } from '../pages/prompts/prompts-learn-a-skill.page';
import { PromptsPositiveFeedbackPage } from '../pages/prompts/prompts-positive-feedback.page';
import { PromptsQuitTipPage } from '../pages/prompts/prompts-quit-tip.page';
import { PromptsTryingToQuitPage } from '../pages/prompts/prompts-trying-to-quit.page';
import { PromptsPage } from '../pages/prompts/prompts.page';
import { ReasonsToQuitPage } from '../pages/reasons-to-quit/reasons-to-quit';
import { RemindersPage } from '../pages/reminders/reminders';
import { VideoFollowUpPage } from '../pages/watch/video-follow-up.page';
import { BundledVideoPage } from '../pages/watch/bundled-video.page';
import { StreamingVideoPage } from '../pages/watch/streaming-video.page';
import { WatchPage } from '../pages/watch/watch.page';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    FerronApp,
    AboutPage,
    AudioFollowUpPage,
    BundledAudioPage,
    BundledVideoPage,
    ConfigurationPage,
    HomePage,
    CopingSkillsPage,
    LearnPage,
    ListenPage,
    NicotineReplacementPage,
    OneStepAtATimePage,
    PromptsGetMotivatedTipPage,
    PromptsLearnASkillPage,
    PromptsPositiveFeedbackPage,
    PromptsQuitTipPage,
    PromptsTryingToQuitPage,
    PromptsPage,
    ReasonsToQuitPage,
    RemindersPage,
    StreamingVideoPage,
    VideoFollowUpPage,
    WatchPage
  ],
  imports: [
    IonicModule.forRoot(FerronApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    FerronApp,
    AboutPage,
    AudioFollowUpPage,
    BundledAudioPage,
    BundledVideoPage,
    ConfigurationPage,
    HomePage,
    CopingSkillsPage,
    LearnPage,
    ListenPage,
    NicotineReplacementPage,
    OneStepAtATimePage,
    PromptsGetMotivatedTipPage,
    PromptsLearnASkillPage,
    PromptsPositiveFeedbackPage,
    PromptsQuitTipPage,
    PromptsTryingToQuitPage,
    PromptsPage,
    ReasonsToQuitPage,
    RemindersPage,
    StreamingVideoPage,
    VideoFollowUpPage,
    WatchPage
  ],
  providers: [
    { provide: AuthenticationTokens, useClass: AuthenticationTokens },
    { provide: Constants, useClass: Constants },
    { provide: FerronAppVersion, useClass: FerronAppVersion },
    { provide: FerronDevice, useClass: FerronDevice },
    { provide: FerronDialogs, useClass: FerronDialogs },
    { provide: FerronLocalNotifications, useClass: FerronLocalNotifications },
    { provide: FerronNetwork, useClass: FerronNetwork },
    { provide: FerronSqlite, useClass: FerronSqlite },
    { provide: FerronToast, useClass: FerronToast },
    { provide: Store, useClass: Store },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
