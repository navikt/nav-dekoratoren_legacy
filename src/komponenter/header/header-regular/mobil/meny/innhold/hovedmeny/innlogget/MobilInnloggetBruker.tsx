import React from 'react';
import BEMHelper from 'utils/bem';
import Tekst from 'tekster/finn-tekst';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import LoggutIkonMobil from 'ikoner/meny/LoggutIkonMobil';
import { Heading, Ingress } from '@navikt/ds-react';
import { getLogOutUrl } from 'utils/login';
import { MobilInnloggetForsideLenke } from './MobilInnloggetForsideLenke';

import './MobilInnloggetBruker.less';

const cls = BEMHelper('innloggetbruker');

const stateSelector = (state: AppState) => ({
    innlogget: state.innloggingsstatus,
    environment: state.environment,
});

const loggut = (logoutUrl: string) => {
    window.location.href = logoutUrl;
};

export const MobilInnloggetBruker = () => {
    const { innlogget, environment } = useSelector(stateSelector);

    return innlogget.data.authenticated ? (
        <>
            <div className={cls.className}>
                <div className={cls.element('label')}>
                    <Heading level="2" size="small">
                        <Tekst id="logget-inn-som" />
                    </Heading>
                </div>
                <div className={cls.element('bruker')}>
                    <Ingress>{innlogget.data.name.toLowerCase()}</Ingress>
                </div>
                <button className={cls.element('loggut')} onClick={() => loggut(getLogOutUrl(environment))}>
                    <LoggutIkonMobil />
                    <div className={cls.element('loggut', 'text')}>
                        <Ingress>
                            <Tekst id="logg-ut-knapp" />
                        </Ingress>
                    </div>
                </button>
            </div>
            <MobilInnloggetForsideLenke />
        </>
    ) : null;
};
