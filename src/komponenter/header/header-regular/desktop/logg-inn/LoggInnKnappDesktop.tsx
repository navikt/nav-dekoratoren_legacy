import KnappBase from 'nav-frontend-knapper';
import React from 'react';
import { LoggInnKnappProps } from 'komponenter/header/header-regular/common/logg-inn/LoggInn';
import LoggInn from 'komponenter/header/header-regular/common/logg-inn/LoggInn';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import './LoggInnKnappDesktop.less';

export const desktopLoginKnappId = 'desktop-login-knapp';

const Knapp = ({ handleButtonClick, tekst }: LoggInnKnappProps) => (
    <KnappBase
        type="standard"
        className="desktop-login-knapp login-knapp"
        id={desktopLoginKnappId}
        onClick={handleButtonClick}
    >
        <Undertittel>{tekst}</Undertittel>
    </KnappBase>
);

export const LoggInnKnappDesktop = () => <LoggInn Knapp={Knapp} />;
