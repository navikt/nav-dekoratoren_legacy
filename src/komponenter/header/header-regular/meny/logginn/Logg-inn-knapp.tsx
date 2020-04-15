import React from 'react';
import { erNavDekoratoren } from 'utils/Environment';
import Tekst from 'tekster/finn-tekst';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { GACategory, triggerGaEvent } from 'utils/google-analytics';
import { TextTransformFirstLetterToUppercase } from '../ekspanderende-menyer/hovedmeny-mobil/HovedmenyMobil';
import KnappBase from 'nav-frontend-knapper';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import './Logg-inn-knapp.less';

export const LoggInnKnapp = () => {
    const { environment } = useSelector((state: AppState) => state);
    const { language } = useSelector((state: AppState) => state.language);
    const { authenticated } = useSelector(
        (state: AppState) => state.innloggingsstatus.data
    );

    const handleButtonClick = () => {
        const { PARAMS, LOGIN_URL, DITT_NAV_URL, LOGOUT_URL } = environment;
        const appUrl = location.origin + location.pathname;
        const loginUrl = `${
            PARAMS.REDIRECT_TO_APP || erNavDekoratoren()
                ? `${LOGIN_URL}/login?redirect=${appUrl}`
                : `${LOGIN_URL}/login?redirect=${DITT_NAV_URL}`
        }&level=${PARAMS.LEVEL}`;

        triggerGaEvent({
            category: GACategory.Header,
            action: authenticated ? 'logg-ut' : 'logg-inn',
        });

        return authenticated
            ? (window.location.href = LOGOUT_URL)
            : (window.location.href = loginUrl);
    };

    const knappetekst = authenticated ? 'logg-ut-knapp' : 'logg-inn-knapp';
    return (
        <div className="login-container">
            <div className="media-sm-mobil login-mobil">
                <KnappBase
                    type="flat"
                    className="mobil-login-knapp"
                    onClick={handleButtonClick}
                >
                    <Undertittel className="knappetekst">
                        <TextTransformFirstLetterToUppercase
                            text={knappetekst}
                            lang={language}
                        />
                    </Undertittel>
                </KnappBase>
            </div>
            <div className="media-tablet-desktop login-tablet-desktop">
                <KnappBase
                    type="standard"
                    className="login-knapp"
                    onClick={handleButtonClick}
                >
                    <Tekst id={knappetekst} />
                </KnappBase>
            </div>
        </div>
    );
};

export default LoggInnKnapp;
