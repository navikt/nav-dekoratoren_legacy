import KnappBase from 'nav-frontend-knapper';
import React from 'react';
import { LoggInnKnappProps } from 'komponenter/header/header-regular/meny/logginn/LoggInn';
import LoggInn from 'komponenter/header/header-regular/meny/logginn/LoggInn';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';

export const LoggInnKnappMobil = () => {
    const knapp = ({ handleButtonClick, tekst }: LoggInnKnappProps) => (
        <KnappBase
            type="flat"
            className="mobil-login-knapp"
            onClick={handleButtonClick}
        >
            <Undertittel className="knappetekst">{tekst}</Undertittel>
        </KnappBase>
    );

    return <LoggInn Knapp={knapp} />;
};
