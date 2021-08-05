import { erNavDekoratoren } from './Environment';
import { MenuValue } from './meny-storage-utils';
import { Environment } from '../store/reducers/environment-duck';

export const getLoginUrl = (environment: Environment, arbeidsflate: MenuValue) => {
    const { LOGIN_URL, DITT_NAV_URL } = environment;
    const { MINSIDE_ARBEIDSGIVER_URL, PARAMS } = environment;
    const appUrl = window.location.origin + window.location.pathname;
    return `${
        PARAMS.REDIRECT_TO_APP || erNavDekoratoren()
            ? `${LOGIN_URL}/login?redirect=${appUrl}`
            : arbeidsflate === MenuValue.ARBEIDSGIVER
            ? `${LOGIN_URL}/login?redirect=${MINSIDE_ARBEIDSGIVER_URL}`
            : `${LOGIN_URL}/login?redirect=${DITT_NAV_URL}`
    }&level=${PARAMS.LEVEL}`;
};

export const logOut = (environment: Environment) => {
    const { LOGOUT_URL, LOGIN_URL } = environment;
    const logoutUrlParam = environment.PARAMS.LOGOUT_URL;

    if (logoutUrlParam) {
        fetch(`${LOGIN_URL}/frontchannel_logout`, { mode: 'no-cors' }).then((res) => {
            console.log('Logged out!', JSON.stringify(res));
            window.location.href = logoutUrlParam;
        });
    } else {
        window.location.href = LOGOUT_URL;
    }
};
