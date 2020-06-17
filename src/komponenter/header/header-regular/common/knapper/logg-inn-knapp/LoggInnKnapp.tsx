import React from 'react';
import { erNavDekoratoren } from 'utils/Environment';
import { finnTekst } from 'tekster/finn-tekst';
import { GACategory, gaEvent } from 'utils/google-analytics';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { MenuValue } from 'utils/meny-storage-utils';
import KnappBase from 'nav-frontend-knapper';
import './LoggInnKnapp.less';

export const loginKnappId = 'desktop-login-knapp';

const stateSelector = (state: AppState) => ({
    innlogget: state.innloggingsstatus.data.authenticated,
    arbeidsflate: state.arbeidsflate.status,
    language: state.language.language,
    environment: state.environment,
});

export const LoggInnKnapp = () => {
    const { innlogget, arbeidsflate, language, environment } = useSelector(
        stateSelector
    );

    const handleButtonClick = () => {
        const { LOGIN_URL, DITT_NAV_URL, LOGOUT_URL } = environment;
        const { MINSIDE_ARBEIDSGIVER_URL } = environment;
        const appUrl = location.origin + location.pathname;
        const loginUrl = `${
            environment.PARAMS.REDIRECT_TO_APP || erNavDekoratoren()
                ? `${LOGIN_URL}/login?redirect=${appUrl}`
                : arbeidsflate === MenuValue.ARBEIDSGIVER
                ? `${LOGIN_URL}/login?redirect=${MINSIDE_ARBEIDSGIVER_URL}`
                : `${LOGIN_URL}/login?redirect=${DITT_NAV_URL}`
        }&level=${environment.PARAMS.LEVEL}`;

        gaEvent({
            context: arbeidsflate,
            category: GACategory.Header,
            action: innlogget ? 'logg-ut' : 'logg-inn',
        });

        return innlogget
            ? (window.location.href = LOGOUT_URL)
            : (window.location.href = loginUrl);
    };

    const knappetekst = finnTekst(
        innlogget ? 'logg-ut-knapp' : 'logg-inn-knapp',
        language
    );

    return (
        <div className={'login-knapp-container'}>
            <KnappBase
                className={`login-knapp${innlogget ? ' logout-knapp' : ''}`}
                onClick={handleButtonClick}
                id={loginKnappId}
            >
                {knappetekst}
            </KnappBase>
        </div>
    );
};

export default LoggInnKnapp;
