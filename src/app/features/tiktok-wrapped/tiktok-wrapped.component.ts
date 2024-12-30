import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {FileService, RawData} from '../../core/services/file.service';
import {UserInfo, VideoItem} from '../../core/models/tiktok.model';
import {delay, interval, of, Subscription, take} from 'rxjs';
import {NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {GreetingComponent} from './greeting/greeting.component';
import {CountVideoComponent} from './count-video/count-video.component';
import dayjs from 'dayjs';
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

          // Aggregate data
          this.analyzedData.spentTime = watchedVideos.reduce((prev, cur, currentIndex) => {
            if (currentIndex == watchedVideos.length - 1) {
              return prev + 15
            }

            const diffWatchTime = Math.abs(dayjs(cur.Date).diff(watchedVideos[currentIndex + 1].Date, "second"));
            if (diffWatchTime > 10 * 60) {
              return prev + 15;
            }
            return prev + diffWatchTime
          }, 0)
          this.isLoading = false
        }
      }
    )
  }

  updateStep(value: number) {
    this.currentStep += value
  }
}
