import {Routes} from '@angular/router';
import {FortuneRankingComponent} from './features/fortune-ranking/fortune-ranking.component';
import {TiktokWrappedComponent} from './features/tiktok-wrapped/tiktok-wrapped.component';
import {HomeComponent} from './features/home/home.component';
import {NotFoundComponent} from './features/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'fortune-rankings',
    component: FortuneRankingComponent,
  },
  {
    path: 'tiktok-wrapped',
    component: TiktokWrappedComponent,
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  }
];
