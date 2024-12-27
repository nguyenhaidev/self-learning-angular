import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {FileService} from '../../core/services/file.service';
import {UserInfo, VideoItem} from '../../core/models/tiktok.model';
import {delay, interval, of, Subscription, take} from 'rxjs';
import {NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {GreetingComponent} from './greeting/greeting.component';
import {CountVideoComponent} from './count-video/count-video.component';
import dayjs from 'dayjs';

@Component({
  selector: 'app-tiktok-wrapped',
  imports: [
    NgIf,
    NgSwitch,
    NgSwitchCase,
    GreetingComponent,
    CountVideoComponent
  ],
  templateUrl: './tiktok-wrapped.component.html',
  styleUrl: './tiktok-wrapped.component.scss',
  providers: [FileService]
})
export class TiktokWrappedComponent implements OnDestroy {
  errMessage: string = ''
  isLoading: boolean = false;
  watchedVideos: VideoItem[] = []
  selectedFile: any | null = null;
  currentStep = 0
  userInfo: UserInfo | null = null;
  totalWatchedTime = 0

  intervalSubscription?: Subscription

  constructor(private store: Store<AppState>, private fileService: FileService) {
  }

  onSelectFile(event: any) {
    if (!event.files[0]) {
      this.selectedFile = null
      return
    }
    this.isLoading = true;
    this.selectedFile = event.files[0];
    this.fileService.readData(event.files[0]).pipe(delay(1000)).subscribe({
      next: ({watchVideos, userInfo}) => {
        this.userInfo = userInfo;
        this.watchedVideos = watchVideos;

        const source$ = interval(3000).pipe(
          take(2)
        );

        // Subscribe to the observable
        this.intervalSubscription = source$.subscribe((value) => {
          this.currentStep = this.currentStep + 1;
          if (this.currentStep === 2) {
            // Aggregate data
            this.totalWatchedTime = this.watchedVideos.reduce((prev, cur, currentIndex) => {
              if (currentIndex == watchVideos.length - 1) {
                return prev + 15
              }

              const diffWatchTime = Math.abs(dayjs(cur.Date).diff(watchVideos[currentIndex + 1].Date, "second"));
              if (diffWatchTime > 10 * 60) {
                return prev + 15;
              }
              return prev + diffWatchTime
            }, 0)
          }
        });
      },
      error: error => {
        this.errMessage = error;
      },
      complete: () => {
        this.isLoading = false;
      }
    })

  }


  ngOnDestroy() {
    this.intervalSubscription?.unsubscribe();
  }
}
