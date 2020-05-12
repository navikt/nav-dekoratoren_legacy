import KnappBase from 'nav-frontend-knapper';
import React from 'react';
import { LoggInnKnappProps } from 'komponenter/header/header-regular/common/logg-inn/LoggInn';
import LoggInn from 'komponenter/header/header-regular/common/logg-inn/LoggInn';
import './LoggInnKnappDesktop.less';

export const desktopLoginKnappId = 'desktop-login-knapp';

const Knapp = ({ handleButtonClick, tekst }: LoggInnKnappProps) => (
    <KnappBase
        type="standard"
        className="desktop-login-knapp login-knapp"
        id={desktopLoginKnappId}
        onClick={handleButtonClick}
    >
        {tekst}
    </KnappBase>
);

export const LoggInnKnappDesktop = () => <LoggInn Knapp={Knapp} />;
