import React from 'react';
import { erNavDekoratoren } from 'utils/Environment';
import { finnTekst } from 'tekster/finn-tekst';
import { GACategory, gaEvent } from 'utils/google-analytics';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { MenuValue } from 'utils/meny-storage-utils';
import KnappBase from 'nav-frontend-knapper';
import './LoggInnKnapp.less';
import { useState } from 'react';
import { useEffect } from 'react';

export const loginKnappId = 'login-knapp-id';

const stateSelector = (state: AppState) => ({
    authenticated: state.innloggingsstatus.data.authenticated,
    expireTime: state.innloggingsstatus.data.expireTime,
    arbeidsflate: state.arbeidsflate.status,
    language: state.language.language,
    environment: state.environment,
});

export const LoggInnKnapp = () => {
    const {
        authenticated,
        expireTime,
        arbeidsflate,
        language,
        environment,
    } = useSelector(stateSelector);
    const [isExpired, setIsExpired] = useState(false);

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

        return authenticated && !isExpired
            ? (window.location.href = LOGOUT_URL)
            : (window.location.href = loginUrl);
    };

    const knappetekst = finnTekst(
        authenticated && !isExpired ? 'logg-ut-knapp' : 'logg-inn-knapp',
        language
    );

    useEffect(() => {
        const expireTestVar = expireTime || Math.floor(Date.now() / 1000 + 120);
        const timeLeft = expireTestVar - Date.now() / 1000;
        if (timeLeft > 0) {
            setTimeout(() => setIsExpired(true), timeLeft * 1000);
        }
    }, [expireTime]);

    return (
        <div className={'login-knapp-container'}>
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
