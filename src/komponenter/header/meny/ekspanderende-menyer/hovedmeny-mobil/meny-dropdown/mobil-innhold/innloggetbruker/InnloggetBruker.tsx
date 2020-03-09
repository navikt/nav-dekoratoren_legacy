import React from 'react';
import BEMHelper from '../../../../../../../../utils/bem';
import Tekst from '../../../../../../../../tekster/finn-tekst';
import { AppState } from '../../../../../../../../reducer/reducer';
import { useSelector } from 'react-redux';
import { Undertittel, Ingress } from 'nav-frontend-typografi';
import './InnloggetBruker.less';
import LoggutIkonMobil from '../../../../../../../../ikoner/mobilmeny/LoggutIkonMobil';
import Environment from '../../../../../../../../utils/Environment';

const cls = BEMHelper('innloggetbruker');

const stateSelector = (state: AppState) => ({
    innlogget: state.innloggingsstatus,
});

const loggut = () => {
    return (window.location.href = Environment.LOGOUT_URL);
};

const InnloggetBruker = () => {
    const { innlogget } = useSelector(stateSelector);
    return innlogget.data.authenticated ? (
        <div className={cls.className}>
            <div className={cls.element('label')}>
                <Undertittel>
                    <Tekst id="logget-inn-som" />
                </Undertittel>
            </div>
            <div className={cls.element('bruker')}>
                <Ingress>{innlogget.data.name}</Ingress>
            </div>
            <div className={cls.element('loggut')} onClick={() => loggut()}>
                <LoggutIkonMobil />
                <div className={cls.element('loggut', 'text')}>
                    <Ingress>
                        <Tekst id="logg-ut-knapp" />
                    </Ingress>
                </div>
            </div>
        </div>
    ) : null;
};

export default InnloggetBruker;
