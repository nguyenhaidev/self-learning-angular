import {AppState} from '../../../reducers';
import {createSelector} from '@ngrx/store';

const selectTiktokData = (state: AppState) => state.tiktok;

export const selectAnalyzedData = createSelector(
  selectTiktokData,
  state => state.analyzedData
);

export const selectIsLoading = createSelector(
  selectTiktokData,
  state => state.isLoading
);
