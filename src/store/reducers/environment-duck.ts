import { MenuValue } from 'utils/meny-storage-utils';
import { ActionType, Handling } from '../actions';
import { AvailableLanguage, Locale } from './language-duck';
import { Breadcrumb } from 'komponenter/header/common/brodsmulesti/Brodsmulesti';

export interface Environment {
    ENV: string;
    XP_BASE_URL: string;
    APP_URL: string;
    APP_BASE_URL: string;
    APP_BASE_PATH: string;
    API_DEKORATOREN_URL: string;
    MINSIDE_ARBEIDSGIVER_URL: string;
    MIN_SIDE_URL: string;
    LOGIN_URL: string;
    LOGOUT_URL: string;
    FEEDBACK_API_URL: string;
    OPPORTUNITY_ID: string;
    CASETYPE_ID: string;
    SOLUTION_ID: string;
    NAV_GROUP_ID: string;

    // Parameters
    PARAMS: Params;
}

export interface Params {
    CONTEXT: MenuValue;
    SIMPLE: boolean;
    SIMPLE_HEADER: boolean;
    SIMPLE_FOOTER: boolean;
    ENFORCE_LOGIN: boolean;
    REDIRECT_TO_APP: boolean;
    REDIRECT_TO_URL?: string;
    LEVEL: string;
    LANGUAGE: Locale;
    AVAILABLE_LANGUAGES?: AvailableLanguage[];
    BREADCRUMBS?: Breadcrumb[];
    FEEDBACK: boolean;
    CHATBOT: boolean;
    CHATBOT_VISIBLE: boolean;
    URL_LOOKUP_TABLE: boolean;
    SHARE_SCREEN: boolean;
    UTILS_BACKGROUND?: string;
    LOGOUT_URL?: string;
    APP_DISPLAY_NAME?: string;
    ACCESSIBILITY_DECLARATION_URL?: string;
}

export interface Cookies {
    CONTEXT: MenuValue;
    LANGUAGE: Locale;
}

export const initialState: Environment = {
    ENV: '',
    XP_BASE_URL: '',
    APP_URL: '',
    APP_BASE_URL: '',
    APP_BASE_PATH: '',
    API_DEKORATOREN_URL: '',
    MINSIDE_ARBEIDSGIVER_URL: '',
    MIN_SIDE_URL: '',
    LOGIN_URL: '',
    LOGOUT_URL: '',
    FEEDBACK_API_URL: '',
    OPPORTUNITY_ID: '',
    CASETYPE_ID: '',
    SOLUTION_ID: '',
    NAV_GROUP_ID: '',

    // Parameters
    PARAMS: {
        CONTEXT: MenuValue.IKKEBESTEMT,
        SIMPLE: false,
        SIMPLE_HEADER: false,
        SIMPLE_FOOTER: false,
        ENFORCE_LOGIN: false,
        REDIRECT_TO_APP: false,
        LEVEL: '',
        LANGUAGE: Locale.IKKEBESTEMT,
        FEEDBACK: false,
        CHATBOT: false,
        CHATBOT_VISIBLE: false,
        URL_LOOKUP_TABLE: false,
        SHARE_SCREEN: false,
    },
};

export const reducer = (state: Environment = initialState, action: Handling): Environment => {
    switch (action.type) {
        case ActionType.SETT_ENVIRONMENT: {
            return { ...state, ...action.data };
        }
        case ActionType.SETT_PARAMS: {
            return {
                ...state,
                PARAMS: {
                    ...state.PARAMS,
                    ...action.data,
                },
            };
        }
        default:
            return state;
    }
};

export const setParams = (params: Partial<Params>) => ({
    type: ActionType.SETT_PARAMS,
    data: params,
});

export default reducer;
