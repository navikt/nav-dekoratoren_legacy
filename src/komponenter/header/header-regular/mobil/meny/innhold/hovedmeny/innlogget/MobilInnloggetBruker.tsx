import React from 'react';
import Tekst from 'tekster/finn-tekst';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import { LoggutIkonMobil } from 'ikoner/meny/LoggutIkonMobil';
import { Button, Heading, Ingress } from '@navikt/ds-react';
import { getLogOutUrl } from 'utils/login';
import { MobilInnloggetForsideLenke } from './MobilInnloggetForsideLenke';

import 'komponenter/header/header-regular/mobil/meny/innhold/hovedmeny/innlogget/MobilInnloggetBruker.scss';

const stateSelector = (state: AppState) => ({
    innlogget: state.innloggingsstatus,
    environment: state.environment,
});

const loggut = (logoutUrl: string) => {
    window.location.href = logoutUrl;
};

export const MobilInnloggetBruker = () => {
    const { innlogget, environment } = useSelector(stateSelector);

    if (!innlogget.data.authenticated) {
        return null;
    }

    return (
        <>
            <div className={'innloggetbruker'}>
                <div className={'innloggetbruker__label'}>
                    <Heading level="2" size="small">
                        <Tekst id="logget-inn-som" />
                    </Heading>
                </div>
                <div className={'innloggetbruker__bruker'}>
                    <Ingress>{innlogget.data.name.toLowerCase()}</Ingress>
                </div>
                <Button
                    onClick={() => loggut(getLogOutUrl(environment))}
                    variant={'tertiary'}
                    className={'innloggetbruker__loggut'}
                    icon={<LoggutIkonMobil />}
                >
                    <Tekst id="logg-ut-knapp" />
                </Button>
            </div>
            <MobilInnloggetForsideLenke />
        </>
    );
};
