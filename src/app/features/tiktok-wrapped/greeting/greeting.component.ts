import {Component, input} from '@angular/core';
import {UserInfo} from '../../../core/models/tiktok.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../reducers';

@Component({
  selector: 'app-greeting',
  imports: [],
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.scss'
})
export class GreetingComponent {
  userInfo = input<UserInfo | null>(null)

  constructor(private store: Store<AppState>) {
  }
}
