import { AppState } from './reducers';

export const selectFeatureToggles = (state: AppState) => state.featureToggles;
