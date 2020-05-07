import KnappBase from 'nav-frontend-knapper';
import React from 'react';
import { LoggInnKnappProps } from 'komponenter/header/header-regular/common/logg-inn/LoggInn';
import LoggInn from 'komponenter/header/header-regular/common/logg-inn/LoggInn';

export const desktopLoginKnappId = 'desktop-login-knapp';

const Knapp = ({ handleButtonClick, tekst }: LoggInnKnappProps) => (
    <KnappBase
        type="standard"
        className="login-knapp"
        id={desktopLoginKnappId}
        onClick={handleButtonClick}
    >
        {tekst}
    </KnappBase>
);

export const LoggInnKnappDesktop = () => <LoggInn Knapp={Knapp} />;
