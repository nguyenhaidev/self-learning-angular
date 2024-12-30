import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import sample from 'lodash/sample';
import {VideoItem} from '../../../core/models/tiktok.model';
import {random} from 'lodash';

@Component({
  selector: 'app-count-video',
  imports: [],
  templateUrl: './count-video.component.html',
  styleUrl: './count-video.component.scss'
})
export class CountVideoComponent implements OnInit {
  @Input({required: true}) watchedVideos: VideoItem[] = []
  @Input() watchVideoCount: number = 0
  @Output() watchVideoCountChange = new EventEmitter<number>()

  messageTemplates: string[] = [
    "You watched [X,XXX videos] on TikTok this year! That’s a lot of laughter, learning, and memories! 🎥",
    "From hilarious skits to inspiring clips, you watched [X,XXX videos] in 2023! What a ride! 🚀",
    "TikTok brought you [X,XXX videos] worth of entertainment this year! Ready for more in 2024?"
  ];
  messageTemplate = this.messageTemplates[0];

  ngOnInit(): void {
    this.watchVideoCount = this.watchedVideos.length;
    this.watchVideoCountChange.emit(this.watchVideoCount);
    const randomIndex = random(0, 2)
    this.messageTemplate = this.messageTemplates[randomIndex];
  }
}
