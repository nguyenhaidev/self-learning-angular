import {Component} from '@angular/core';
import {FileService, RawData} from '../../core/services/file.service';
import {AnalyzedData, IAnalyzedData, UserInfo} from '../../core/models/tiktok.model';
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
  providers: [FileService, AnalyzeService]
})
export class TiktokWrappedComponent {
  errMessage: string = ''
  isLoading: boolean = false;
  selectedFile: any | null = null;
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

  constructor(private fileService: FileService, private analyzeService: AnalyzeService) {
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
          console.log(this.rawData);
          this.analyzedData = this.analyzeService.analyzeData(this.rawData);
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
