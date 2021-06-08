import React, { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from 'react';
import LiteEkspanderbartvindu from './LiteEkspanderbartvindu/LiteEkspanderbartvindu';
import Header from './Header';
import UtloggingNavigasjon from './UtloggingNavigasjon';
import UtloggingsvarselTekstInnhold from './UtloggingsvarselTekstInnhold';
import UtloggingsvarselValg from './UtloggingsvarselValg';
import Nedteller from './Nedteller';
import { WindowType } from './ResizeHandler';
import BEMHelper from '../../../../utils/bem';
import { getCurrentTimeStamp, timeStampIkkeUtgatt } from '../timestamp.utils';
import { useInterval } from '../useInterval';
import { AppState } from '../../../../store/reducers';
import { useSelector } from 'react-redux';

interface Props {
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    setMinimized: Dispatch<SetStateAction<boolean>>;
    modalOpen: boolean;
    minimized: boolean;
    timestamp: number;
    windowType: WindowType;
}

const stateSelector = (state: AppState) => ({
    environment: state.environment,
});

const UtloggingsvarselInnhold: FunctionComponent<Props> = (props) => {
    const [tid, setTid] = useState<string>('- minutter');
    const [overskrift, setOverskrift] = useState<string>('Du blir snart logget ut');
    const [interval, setInterval] = useState<boolean>(timeStampIkkeUtgatt(props.timestamp - getCurrentTimeStamp()));
    const [vistSistePaminnelse, setVistSistePaminnelse] = useState<boolean>(false);

    const { setModalOpen, setMinimized, modalOpen, minimized, timestamp } = props;
    const { environment } = useSelector(stateSelector);
    const cls = BEMHelper('utloggingsvarsel');
    const { LOGOUT_URL } = environment;

    useEffect(() => {
        setInterval(timeStampIkkeUtgatt(props.timestamp - getCurrentTimeStamp()));
    }, [props.timestamp]);

    const openModalOneMinLeft = () => {
        setVistSistePaminnelse(true);
        return modalOpen ? setMinimized(false) : setModalOpen(true);
    };

    useInterval(
        () => {
            const tokenExpire = timestamp - getCurrentTimeStamp();
            if (timeStampIkkeUtgatt(getCurrentTimeStamp() - timestamp + 1)) {
                setInterval(false);
                window.location.href = LOGOUT_URL;
            }

            if (tokenExpire <= 60) {
                if (!vistSistePaminnelse) {
                    openModalOneMinLeft();
                }
                setTid(`${Math.floor(tokenExpire)} sekunder`);
                setOverskrift('Nå blir du logget ut');
            } else {
                const min: number = Math.floor(tokenExpire / 60) + 1;
                setTid(`${min} minutter`);
            }
        },
        interval ? 1000 : null
    );

    return (
        <>
            <LiteEkspanderbartvindu
                setMinimized={setMinimized}
                setModalOpen={setModalOpen}
                minimized={minimized}
                typoGrafi="normaltekst"
                tid={tid}
                visFullTekst={true}
            />
            <div className={cls.element('main-wrapper')} aria-hidden={minimized}>
                <Header />
                <div className={cls.element('container')}>
                    <UtloggingNavigasjon setMinimized={setMinimized} minimized={minimized} />
                    <UtloggingsvarselTekstInnhold overskrift={overskrift} />
                    <UtloggingsvarselValg minimized={minimized} />
                    <Nedteller typoGrafi="normaltekst" tekst={'Du blir automatisk logget ut om '.concat(tid)} />
                </div>
            </div>
        </>
    );
};
export default UtloggingsvarselInnhold;
