import { erNavDekoratoren } from './Environment';
import { MenuValue } from './meny-storage-utils';
import { EnvironmentState } from '../store/reducers/environment-duck';

export const getLoginUrl = (
    environment: EnvironmentState,
    arbeidsflate: MenuValue
) => {
    const { LOGIN_URL, DITT_NAV_URL } = environment;
    const { MINSIDE_ARBEIDSGIVER_URL, PARAMS } = environment;
    const appUrl = location.origin + location.pathname;
    return `${
        PARAMS.REDIRECT_TO_APP || erNavDekoratoren()
            ? `${LOGIN_URL}/login?redirect=${appUrl}`
            : arbeidsflate === MenuValue.ARBEIDSGIVER
            ? `${LOGIN_URL}/login?redirect=${MINSIDE_ARBEIDSGIVER_URL}`
            : `${LOGIN_URL}/login?redirect=${DITT_NAV_URL}`
    }&level=${PARAMS.LEVEL}`;
};
