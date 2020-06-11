import React from 'react';
import { erNavDekoratoren } from 'utils/Environment';
import { finnTekst } from 'tekster/finn-tekst';
import { GACategory, gaEvent } from 'utils/google-analytics';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { MenuValue } from 'utils/meny-storage-utils';
import KnappBase from 'nav-frontend-knapper';
import './LoggInnKnapp.less';

type Props = {
    type?: 'standard' | 'hoved' | 'fare' | 'flat';
    id?: string;
};

export const LoggInnKnapp = ({ type, id }: Props) => {
    const { environment } = useSelector((state: AppState) => state);
    const { PARAMS } = useSelector((state: AppState) => state.environment);
    const language = useSelector((state: AppState) => state.language.language);
    const { authenticated } = useSelector(
        (state: AppState) => state.innloggingsstatus.data
    );
    const arbeidsflate = useSelector(
        (state: AppState) => state.arbeidsflate.status
    );

    const handleButtonClick = () => {
        const { LOGIN_URL, DITT_NAV_URL, LOGOUT_URL } = environment;
        const { MINSIDE_ARBEIDSGIVER_URL } = environment;
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
        <div className={'login-knapp-container'}>
            <KnappBase
                className={`login-knapp${authenticated ? ' logout-knapp' : ''}`}
                onClick={handleButtonClick}
                id={id}
                type={type}
            >
                {knappetekst}
            </KnappBase>
        </div>
    );
};

export default LoggInnKnapp;
