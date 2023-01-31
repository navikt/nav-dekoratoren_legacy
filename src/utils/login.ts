import { erNavDekoratoren } from './Environment';
import { MenuValue } from './meny-storage-utils';
import { Environment } from '../store/reducers/environment-duck';

const getRedirectUrl = (environment: Environment, arbeidsflate: MenuValue) => {
    const { MIN_SIDE_URL, MINSIDE_ARBEIDSGIVER_URL, PARAMS } = environment;
    const { REDIRECT_TO_URL, REDIRECT_TO_APP } = PARAMS;

    const appUrl = window.location.origin + window.location.pathname;

    if (erNavDekoratoren()) {
        return appUrl;
    }

    if (REDIRECT_TO_URL) {
        return REDIRECT_TO_URL;
    }

    if (REDIRECT_TO_APP) {
        return appUrl;
    }

    if (arbeidsflate === MenuValue.ARBEIDSGIVER) {
        return MINSIDE_ARBEIDSGIVER_URL;
    }

    return MIN_SIDE_URL;
};

export const getLoginUrl = (environment: Environment, arbeidsflate: MenuValue, level?: string) => {
    const { LOGIN_URL, PARAMS } = environment;
    const { LEVEL } = PARAMS;

    const redirectUrl = getRedirectUrl(environment, arbeidsflate);

    return `${LOGIN_URL}/login?redirect=${redirectUrl}&level=${level || LEVEL}`;
};

export const getLogOutUrl = (environment: Environment) => environment.PARAMS.LOGOUT_URL || environment.LOGOUT_URL;
