import { ActionType } from 'store/actions';
import { Handling } from 'store/actions';

export interface FeatureToggles {
    [key: string]: boolean;
}

// Define required feature-toggles, e.g:
// {
//   dekoratoren.example': false,
//   ...
// }
export const initialState: FeatureToggles = {};
// Toggles will be fetched on runtime

export const reducer = (
    state: FeatureToggles = initialState,
    action: Handling
): FeatureToggles => {
    switch (action.type) {
        case ActionType.SETT_FEATURE_TOGGLES: {
            return { ...state, ...action.data };
        }
        default:
            return state;
    }
};

export default reducer;
