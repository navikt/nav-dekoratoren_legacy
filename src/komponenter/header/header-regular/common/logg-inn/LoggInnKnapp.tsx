import React from 'react';
import { AnalyticsCategory, analyticsEvent } from 'utils/analytics/analytics';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { getLoginUrl, getLogOutUrl } from 'utils/login';
import { Login, Logout } from '@navikt/ds-icons';
import Tekst from 'tekster/finn-tekst';
import { Status } from '../../../../../api/api';
import style from './LoggInnKnapp.module.scss';
import MenylinjeKnapp from '../meny-knapp/MenylinjeKnapp';

export const loginKnappId = 'login-knapp-id';

const stateSelector = (state: AppState) => ({
    authenticated: state.innloggingsstatus.data.authenticated,
    innloggingsstatus: state.innloggingsstatus.status,
    arbeidsflate: state.arbeidsflate.status,
    language: state.language.language,
    environment: state.environment,
});

export const LoggInnKnapp = () => {
    const { authenticated, arbeidsflate, environment, innloggingsstatus } = useSelector(stateSelector);

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

    return (
        <div className={style.loginKnappContainer}>
            <MenylinjeKnapp
                classPrefix="login"
                className={`${style.loginKnapp} ${authenticated ? 'logout-knapp' : ''}`}
                onClick={handleButtonClick}
                id={loginKnappId}
                disabled={isLoading}
                icon={
                    authenticated ? (
                        <Logout title="Loggut-ikon" titleId="decorator-logout-icon" aria-hidden />
                    ) : (
                        <Login
                            className={isLoading ? style.loginIconLoading : undefined}
                            title="Logginn-ikon"
                            titleId="decorator-login-icon"
                            aria-hidden
                        />
                    )
                }
            >
                <span className={isLoading && style.loginTextLoading}>
                    <Tekst id={isLoading ? 'logg-inn-loader' : authenticated ? 'logg-ut-knapp' : 'logg-inn-knapp'} />
                </span>
            </MenylinjeKnapp>
        </div>
    );
};

export default LoggInnKnapp;
