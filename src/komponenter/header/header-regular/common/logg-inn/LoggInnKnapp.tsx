import React from 'react';
import { finnTekst } from 'tekster/finn-tekst';
import { AnalyticsCategory, analyticsEvent } from 'utils/analytics';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import KnappBase from 'nav-frontend-knapper';
import { getLoginUrl } from 'utils/login';
import './LoggInnKnapp.less';

export const loginKnappId = 'login-knapp-id';

const stateSelector = (state: AppState) => ({
    authenticated: state.innloggingsstatus.data.authenticated,
    arbeidsflate: state.environment.PARAMS.CONTEXT,
    language: state.language.language,
    environment: state.environment,
});

export const LoggInnKnapp = () => {
    const { authenticated, arbeidsflate, language, environment } = useSelector(
        stateSelector
    );

    const handleButtonClick = () => {
        const { LOGOUT_URL } = environment;
        const loginUrl = getLoginUrl(environment, arbeidsflate);

        analyticsEvent({
            context: arbeidsflate,
            category: AnalyticsCategory.Header,
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
