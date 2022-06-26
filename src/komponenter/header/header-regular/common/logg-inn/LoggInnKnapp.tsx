import React from 'react';
import { Button } from '@navikt/ds-react';
import { finnTekst } from 'tekster/finn-tekst';
import { AnalyticsCategory, analyticsEvent } from 'utils/analytics/analytics';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { getLoginUrl, getLogOutUrl } from 'utils/login';
import { Login, Logout } from '@navikt/ds-icons';
import { Status } from '../../../../../api/api';
import classNames from 'classnames';

import './LoggInnKnapp.less';

export const loginKnappId = 'login-knapp-id';

const stateSelector = (state: AppState) => ({
    authenticated: state.innloggingsstatus.data.authenticated,
    innloggingsstatus: state.innloggingsstatus.status,
    arbeidsflate: state.arbeidsflate.status,
    language: state.language.language,
    environment: state.environment,
});

export const LoggInnKnapp = () => {
    const { authenticated, arbeidsflate, language, environment, innloggingsstatus } = useSelector(stateSelector);

    const handleButtonClick = () => {
        analyticsEvent({
            context: arbeidsflate,
            category: AnalyticsCategory.Header,
            action: authenticated ? 'logg-ut' : 'logg-inn',
        });

        window.location.href = authenticated ? getLogOutUrl(environment) : getLoginUrl(environment, arbeidsflate);
    };

    const isLoading =
        innloggingsstatus === Status.IKKE_STARTET ||
        innloggingsstatus === Status.PENDING ||
        innloggingsstatus === Status.RELOADING;

    const knappetekst = finnTekst(
        isLoading ? 'logg-inn-loader' : authenticated ? 'logg-ut-knapp' : 'logg-inn-knapp',
        language
    );

    return (
        <div className={'login-knapp-container'}>
            <Button
                className={`login-knapp${authenticated ? ' logout-knapp' : ''}`}
                onClick={handleButtonClick}
                id={loginKnappId}
                variant={'tertiary'}
                disabled={isLoading}
            >
                {authenticated ? <Logout /> : <Login className={isLoading ? 'login-icon-loading' : undefined} />}
                <span className={classNames('login-text', isLoading && 'login-text-loading')}>{knappetekst}</span>
            </Button>
        </div>
    );
};

export default LoggInnKnapp;
//
