import React from 'react';
import { finnTekst } from 'tekster/finn-tekst';
import { AnalyticsCategory, analyticsEvent } from 'utils/analytics/analytics';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import KnappBase from 'nav-frontend-knapper';
import { getLoginUrl, getLogOutUrl } from 'utils/login';
import './LoggInnKnapp.less';

export const loginKnappId = 'login-knapp-id';

const stateSelector = (state: AppState) => ({
    authenticated: state.innloggingsstatus.data.authenticated,
    arbeidsflate: state.arbeidsflate.status,
    language: state.language.language,
    environment: state.environment,
});

export const LoggInnKnapp = () => {
    const { authenticated, arbeidsflate, language, environment } = useSelector(stateSelector);

    const handleButtonClick = () => {
        analyticsEvent({
            context: arbeidsflate,
            category: AnalyticsCategory.Header,
            action: authenticated ? 'logg-ut' : 'logg-inn',
        });

        window.location.href = authenticated ? getLogOutUrl(environment) : getLoginUrl(environment, arbeidsflate);
    };

    const knappetekst = finnTekst(authenticated ? 'logg-ut-knapp' : 'logg-inn-knapp', language);

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
