import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-spent-time',
  imports: [],
  templateUrl: './spent-time.component.html',
  styleUrl: './spent-time.component.scss'
})
export class SpentTimeComponent {
  @Input({transform: (value:number) => Math.round(value/60)}) spentTime: number = 0
}
