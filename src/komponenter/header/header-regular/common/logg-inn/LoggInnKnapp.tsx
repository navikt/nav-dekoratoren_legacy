import React from 'react';
import { erNavDekoratoren } from 'utils/Environment';
import { finnTekst } from 'tekster/finn-tekst';
import { GACategory, gaEvent } from 'utils/google-analytics';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { MenuValue } from 'utils/meny-storage-utils';
import KnappBase from 'nav-frontend-knapper';
import './LoggInnKnapp.less';

export const loginKnappId = 'login-knapp-id';

const stateSelector = (state: AppState) => ({
    authenticated: state.innloggingsstatus.data.authenticated,
    arbeidsflate: state.arbeidsflate.status,
    language: state.language.language,
    environment: state.environment,
});

export const LoggInnKnapp = () => {
    const { authenticated, arbeidsflate, language, environment } = useSelector(
        stateSelector
    );

    const handleButtonClick = () => {
        const { LOGIN_URL, DITT_NAV_URL, LOGOUT_URL } = environment;
        const { MINSIDE_ARBEIDSGIVER_URL, PARAMS } = environment;
        const appUrl = location.origin + location.pathname;
        const loginUrl = `${
            PARAMS.REDIRECT_TO_APP || erNavDekoratoren()
                ? `${LOGIN_URL}/login?redirect=${appUrl}`
                : arbeidsflate === MenuValue.ARBEIDSGIVER
                ? `${LOGIN_URL}/login?redirect=${MINSIDE_ARBEIDSGIVER_URL}`
                : `${LOGIN_URL}/login?redirect=${DITT_NAV_URL}`
        }&level=${PARAMS.LEVEL}`;

        gaEvent({
            context: arbeidsflate,
            category: GACategory.Header,
            action: authenticated ? 'logg-ut' : 'logg-inn',
        });

        return authenticated
            ? (window.location.href = LOGOUT_URL)
            : (window.location.href = loginUrl);
    };

    const knappetekst = finnTekst(
        authenticated ? 'logg-ut-knapp' : 'logg-inn-knapp',
        language
    );

    return (
        <div className={'media-tablet-desktop login-knapp-container'}>
            <KnappBase
                className={`login-knapp${authenticated ? ' logout-knapp' : ''}`}
                onClick={handleButtonClick}
                id={loginKnappId}
            >
                {knappetekst}
            </KnappBase>
        </div>
    );
};

export default LoggInnKnapp;
