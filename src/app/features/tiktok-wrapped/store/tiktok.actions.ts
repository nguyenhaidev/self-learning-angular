import {createAction, props} from '@ngrx/store';
import {TiktokState} from './tiktok.reducer';

export const tiktokActions = {
  UPDATE_STATE: '[Tiktok] Parse RAW Data',
}

export const updateTikTokStates = createAction(
  tiktokActions.UPDATE_STATE,
  props<Partial<TiktokState>>()
)
