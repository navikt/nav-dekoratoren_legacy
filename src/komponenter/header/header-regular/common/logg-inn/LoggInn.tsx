import React from 'react';
import { erNavDekoratoren } from 'utils/Environment';
import { finnTekst } from 'tekster/finn-tekst';
import { GACategory, gaEvent } from 'utils/google-analytics';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import 'komponenter/header/header-regular/common/logg-inn/LoggInn.less';

export type LoggInnKnappProps = {
    handleButtonClick: () => string;
    tekst: string;
};

type Props = {
    Knapp: (props: LoggInnKnappProps) => JSX.Element;
};

export const LoggInn = ({ Knapp }: Props) => {
    const { environment } = useSelector((state: AppState) => state);
    const { language } = useSelector((state: AppState) => state.language);
    const { authenticated } = useSelector(
        (state: AppState) => state.innloggingsstatus.data
    );
    const arbeidsflate = useSelector(
        (state: AppState) => state.arbeidsflate.status
    );

    const handleButtonClick = () => {
        const { PARAMS, LOGIN_URL, DITT_NAV_URL, LOGOUT_URL } = environment;
        const appUrl = location.origin + location.pathname;
        const loginUrl = `${
            PARAMS.REDIRECT_TO_APP || erNavDekoratoren()
                ? `${LOGIN_URL}/login?redirect=${appUrl}`
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

    return <Knapp handleButtonClick={handleButtonClick} tekst={knappetekst} />;
};

export default LoggInn;
