import {Component} from '@angular/core';
import {FileService, RawData} from '../../core/services/file.service';
import {UserInfo} from '../../core/models/tiktok.model';
import {delay} from 'rxjs';
import {NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {GreetingComponent} from './greeting/greeting.component';
import {CountVideoComponent} from './count-video/count-video.component';
import {SpentTimeComponent} from './spent-time/spent-time.component';
import {MostActiveWeekdayComponent} from './most-active-weekday/most-active-weekday.component';
import {LscCountComponent} from './lsc-count/lsc-count.component';
import {SessionComponent} from './session/session.component';
import {FollowComponent} from './follow/follow.component';
import {SummaryComponent} from './summary/summary.component';

@Component({
  selector: 'app-tiktok-wrapped',
  imports: [
    NgIf,
    NgSwitch,
    NgSwitchCase,
    GreetingComponent,
    CountVideoComponent,
    SpentTimeComponent,
    MostActiveWeekdayComponent,
    LscCountComponent,
    SessionComponent,
    FollowComponent,
    SummaryComponent
  ],
  templateUrl: './tiktok-wrapped.component.html',
  styleUrl: './tiktok-wrapped.component.scss',
  providers: [FileService]
})
export class TiktokWrappedComponent {
  errMessage: string = ''
  isLoading: boolean = false;
  selectedFile: any | null = null;
  currentStep = 0
  userInfo: UserInfo | null = null;
  rawData: RawData = {
    watchedVideos: [],
    userInfo: null,
    comments: [],
    userVideos: [],
    likedVideos: [],
    sharedVideos: [],
    followers: []
  }

  analyzedData = {
    // Activity KPIs
    spentTime: 0,
    watchedTime: 0,
    commentCount: 0,
    likedVideoCount: 0,
    sharedVideoCount: 0,
    mostActiveWeekday: '',

    // Follow KPI
    followerGrowth: 0,
    followingGrowth: 0,

    // Session KPI
    averageWatchTime: 0,
    longestSession: '',
    watchSessionCount: 0,
  }

  constructor(private fileService: FileService) {
  }

  onSelectFile(event: any) {
    if (!event.files[0]) {
      this.selectedFile = null
      return
    }
    this.isLoading = true;
    this.selectedFile = event.files[0];
    this.fileService.readData(event.files[0]).pipe(delay(1000)).subscribe({
        next: (rawData) => {
          this.rawData = rawData;
          const {followers, userInfo, userVideos, watchedVideos, sharedVideos, likedVideos, comments} = rawData;
          this.userInfo = userInfo;
        },
        error: (error) => {
          this.errMessage = error.message;
        },
        complete: () => {
          this.isLoading = false
        }
      }
    )
  }

  updateStep(value: number) {
    this.currentStep += value
  }
}
