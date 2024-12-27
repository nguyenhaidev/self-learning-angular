import {Component, Input, OnInit} from '@angular/core';
import sample from 'lodash/sample';

@Component({
  selector: 'app-count-video',
  imports: [],
  templateUrl: './count-video.component.html',
  styleUrl: './count-video.component.scss'
})
export class CountVideoComponent implements OnInit {
  @Input({required: true}) totalWatchedVideos!: number

  messageTemplates: string[] = [
    "You watched [X,XXX videos] on TikTok this year! That’s a lot of laughter, learning, and memories! 🎥",
    "From hilarious skits to inspiring clips, you watched [X,XXX videos] in 2023! What a ride! 🚀",
    "TikTok brought you [X,XXX videos] worth of entertainment this year! Ready for more in 2024?"
  ];
  randomIndex: number = 0

  ngOnInit(): void {
    this.randomIndex = sample([0, 1, 2])
  }
}
