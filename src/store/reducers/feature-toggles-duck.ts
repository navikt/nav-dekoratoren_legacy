import { ActionType } from 'store/actions';
import { Handling } from 'store/actions';

export interface FeatureToggles {
    [key: string]: boolean;
}

export const initialState: FeatureToggles = {
    'feature-test': false,
};

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
