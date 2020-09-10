import { MenuValue } from 'utils/meny-storage-utils';
import { ActionType, Handling } from '../actions';
import { Locale, AvailableLanguage } from './language-duck';
import { Breadcrumb } from '../../komponenter/header/common/brodsmulesti/Brodsmulesti';

export interface EnvironmentState {
    XP_BASE_URL: string;
    APP_URL: string;
    APP_BASE_URL: string;
    APP_BASE_PATH: string;
    API_VARSELINNBOKS_URL: string;
    API_UNLEASH_PROXY_URL: string;
    MINSIDE_ARBEIDSGIVER_URL: string;
    DITT_NAV_URL: string;
    LOGIN_URL: string;
    LOGOUT_URL: string;
    SERVER_TIME: number;

    // Parameters
    PARAMS: {
        CONTEXT: MenuValue;
        SIMPLE: boolean;
        SIMPLE_HEADER: boolean;
        SIMPLE_FOOTER: boolean;
        ENFORCE_LOGIN: boolean;
        REDIRECT_TO_APP: boolean;
        LEVEL: string;
        LANGUAGE: Locale;
        AVAILABLE_LANGUAGES?: AvailableLanguage[];
        BREADCRUMBS?: Breadcrumb[];
        FEEDBACK: boolean;
        CHATBOT: boolean;
    };

    COOKIES: {
        CONTEXT: MenuValue;
        LANGUAGE: Locale;
    };
}

export const initialState: EnvironmentState = {
    XP_BASE_URL: '',
    APP_URL: '',
    APP_BASE_URL: '',
    APP_BASE_PATH: '',
    API_VARSELINNBOKS_URL: '',
    API_UNLEASH_PROXY_URL: '',
    MINSIDE_ARBEIDSGIVER_URL: '',
    DITT_NAV_URL: '',
    LOGIN_URL: '',
    LOGOUT_URL: '',
    SERVER_TIME: 0,

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
    },

    // Cookies
    COOKIES: {
        LANGUAGE: Locale.IKKEBESTEMT,
        CONTEXT: MenuValue.IKKEBESTEMT,
    },
};

export const reducer = (
    state: EnvironmentState = initialState,
    action: Handling
): EnvironmentState => {
    switch (action.type) {
        case ActionType.SETT_ENVIRONMENT: {
            return { ...state, ...action.data };
        }
        default:
            return state;
    }
};

export default reducer;
