import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import LiteEkspanderbartvindu from './LiteEkspanderbartvindu/LiteEkspanderbartvindu';
import Header from './Header';
import UtloggingNavigasjon from './UtloggingNavigasjon';
import UtloggingsvarselTekstInnhold from './UtloggingsvarselTekstInnhold';
import UtloggingsvarselValg from './UtloggingsvarselValg';
import Nedteller from './Nedteller';
import { WindowType } from './ResizeHandler';
import BEMHelper from '../../../../utils/bem';

interface Props {
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    setMinimized: Dispatch<SetStateAction<boolean>>;
    minimized: boolean;
    windowType: WindowType;
    overskrift: string;
    tid: string;
}

const UtloggingsvarselInnhold: FunctionComponent<Props> = (props) => {
    const { setModalOpen, setMinimized, minimized, overskrift, tid } = props;
    const cls = BEMHelper('utloggingsvarsel');

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
