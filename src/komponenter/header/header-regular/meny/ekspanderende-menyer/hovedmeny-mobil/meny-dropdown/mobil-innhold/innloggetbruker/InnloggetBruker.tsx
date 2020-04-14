import React from 'react';
import BEMHelper from '../../../../../../../../../utils/bem';
import Tekst from '../../../../../../../../../tekster/finn-tekst';
import { AppState } from '../../../../../../../../../reducer/reducers';
import { useSelector } from 'react-redux';
import { Undertittel, Ingress } from 'nav-frontend-typografi';
import './InnloggetBruker.less';
import LoggutIkonMobil from '../../../../../../../../ikoner/mobilmeny/LoggutIkonMobil';

interface Props {
    tabIndex: boolean;
}

const cls = BEMHelper('innloggetbruker');

const stateSelector = (state: AppState) => ({
    innlogget: state.innloggingsstatus,
});

const loggut = (LOGOUT_URL: string) => {
    return (window.location.href = LOGOUT_URL);
};

const InnloggetBruker = (props: Props) => {
    const { LOGOUT_URL } = useSelector((state: AppState) => state.environment);
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
            <button
                className={cls.element('loggut')}
                onClick={() => loggut(LOGOUT_URL)}
                tabIndex={props.tabIndex ? 0 : -1}
            >
                <LoggutIkonMobil />
                <div className={cls.element('loggut', 'text')}>
                    <Ingress>
                        <Tekst id="logg-ut-knapp" />
                    </Ingress>
                </div>
            </button>
        </div>
    ) : null;
};

export default InnloggetBruker;
