import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-count-video',
  imports: [],
  templateUrl: './count-video.component.html',
  styleUrl: './count-video.component.scss'
})
export class CountVideoComponent {
  @Input({required: true}) watchVideoCount!: number

  messageTemplates: string[] = [
    "You watched [X,XXX videos] on TikTok this year! That’s a lot of laughter, learning, and memories! 🎥",
    "From hilarious skits to inspiring clips, you watched [X,XXX videos] in 2023! What a ride! 🚀",
    "TikTok brought you [X,XXX videos] worth of entertainment this year! Ready for more in 2024?"
  ];
  messageTemplate = this.messageTemplates[0];

}
