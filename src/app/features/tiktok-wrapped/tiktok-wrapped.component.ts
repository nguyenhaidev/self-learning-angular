import {Component} from '@angular/core';
import {FileService, RawData} from '../../core/services/file.service';
import {AnalyzedData, IAnalyzedData} from '../../core/models/tiktok.model';
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
import {AnalyzeService} from '../../core/services/analyze.service';
import {SelectFileComponent} from './select-file/select-file.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {updateTikTokStates} from './store/tiktok.actions';

@Component({
  selector: 'app-tiktok-wrapped',
  imports: [
    NgSwitch,
    NgSwitchCase,
    GreetingComponent,
    CountVideoComponent,
    SpentTimeComponent,
    MostActiveWeekdayComponent,
    LscCountComponent,
    SessionComponent,
    FollowComponent,
    SummaryComponent,
    SelectFileComponent,
    NgIf
  ],
  templateUrl: './tiktok-wrapped.component.html',
  styleUrl: './tiktok-wrapped.component.scss',
  providers: [FileService, AnalyzeService]
})
export class TiktokWrappedComponent {
  errMessage: string = ''
  isLoading: boolean = false;
  currentStep = 0
  rawData: RawData = {
    watchedVideos: [],
    userInfo: null,
    comments: [],
    userVideos: [],
    likedVideos: [],
    sharedVideos: [],
    followers: [],
    followings: []
  }

  analyzedData: IAnalyzedData = new AnalyzedData();

  constructor(private fileService: FileService, private analyzeService: AnalyzeService, private store: Store<AppState>) {
  }

  onSelectFile(file: File | null) {
    if (!file) {
      return;
    }

    this.isLoading = true;
    this.fileService.readData(file).pipe(delay(2000)).subscribe({
        next: (rawData) => {
          this.rawData = rawData;
          this.analyzedData = this.analyzeService.analyzeData(this.rawData);
          this.store.dispatch(updateTikTokStates({analyzedData: this.analyzedData}));
          this.currentStep++
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
