import { erNavDekoratoren } from './Environment';
import { MenuValue } from './meny-storage-utils';
import { Environment } from '../store/reducers/environment-duck';

export const getLoginUrl = (environment: Environment, arbeidsflate: MenuValue) => {
    const { LOGIN_URL, DITT_NAV_URL } = environment;
    const { MINSIDE_ARBEIDSGIVER_URL, PARAMS } = environment;
    const appUrl = window.location.origin + window.location.pathname + window.location.search;
    return `${
        PARAMS.REDIRECT_TO_APP || erNavDekoratoren()
            ? `${LOGIN_URL}/login?redirect=${appUrl}`
            : arbeidsflate === MenuValue.ARBEIDSGIVER
            ? `${LOGIN_URL}/login?redirect=${MINSIDE_ARBEIDSGIVER_URL}`
            : `${LOGIN_URL}/login?redirect=${DITT_NAV_URL}`
    }&level=${PARAMS.LEVEL}`;
};

export const getLogOutUrl = (environment: Environment) => environment.PARAMS.LOGOUT_URL || environment.LOGOUT_URL;
