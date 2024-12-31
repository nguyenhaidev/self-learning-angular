import {createReducer, on} from '@ngrx/store';
import {updateTikTokStates,} from './tiktok.actions';
import {AnalyzedData} from '../../../core/models/tiktok.model';

export interface TiktokState {
  currentStep: number;
  isLoading: boolean;
  analyzedData: AnalyzedData
}

const initialState: TiktokState = {
  currentStep: 0,
  analyzedData: new AnalyzedData(),
  isLoading: false
}

export const tiktokReducer = createReducer(
  initialState,
  on(updateTikTokStates, (state: TiktokState, payload: Partial<TiktokState>) => {
    return {...state, ...payload}
  })
)
