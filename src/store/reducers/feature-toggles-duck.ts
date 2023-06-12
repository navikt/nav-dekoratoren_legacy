import { ActionType } from 'store/actions';
import { Handling } from 'store/actions';

export interface FeatureToggles {
    [key: string]: boolean;
}

// Define feature-toggles and initial value, e.g:
// {
//   dekoratoren.example': false,
//   ...
// }
export const initialState: FeatureToggles = {
    'dekoratoren.skjermdeling': false,
    'dekoratoren.chatbotscript': false,
};
// Defined toggles will be fetched from unleash on runtime

export const reducer = (state: FeatureToggles = initialState, action: Handling): FeatureToggles => {
    switch (action.type) {
        case ActionType.SETT_FEATURE_TOGGLES: {
            return { ...state, ...action.data };
        }
        default:
            return state;
    }
};

export default reducer;
