import {isDevMode} from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import {tiktokReducer, TiktokState} from '../features/tiktok-wrapped/store/tiktok.reducer';


export interface AppState {
  tiktok: TiktokState;
}

export const reducers: ActionReducerMap<AppState> = {
  tiktok: tiktokReducer,
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
