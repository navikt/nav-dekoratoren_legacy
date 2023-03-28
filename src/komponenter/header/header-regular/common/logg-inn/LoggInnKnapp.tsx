import React, { useId } from 'react';
import { Button } from '@navikt/ds-react';
import { finnTekst } from 'tekster/finn-tekst';
import { AnalyticsCategory, analyticsEvent } from 'utils/analytics/analytics';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { getLoginUrl, getLogOutUrl } from 'utils/login';
import { Login, Logout } from '@navikt/ds-icons';
import { Status } from '../../../../../api/api';
import classNames from 'classnames';
import style from './LoggInnKnapp.module.scss';

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
        <div className={style.loginKnappContainer}>
            <Button
                className={`${style.loginKnapp} ${authenticated ? 'logout-knapp' : ''}`}
                onClick={handleButtonClick}
                id={loginKnappId}
                variant={'tertiary'}
                disabled={isLoading}
                icon={
                    authenticated ? (
                        <Logout aria-hidden />
                    ) : (
                        <Login
                            className={isLoading ? style.loginIconLoading : undefined}
                            title="Login-ikon"
                            titleId={`decorator-${useId()}`}
                            aria-hidden
                        />
                    )
                }
            >
                <span className={classNames(style.loginText, isLoading && style.loginTextLoading)}>{knappetekst}</span>
            </Button>
        </div>
    );
};

export default LoggInnKnapp;
