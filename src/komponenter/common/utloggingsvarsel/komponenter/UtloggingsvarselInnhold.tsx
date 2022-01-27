import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import LiteEkspanderbartvindu from './LiteEkspanderbartvindu/LiteEkspanderbartvindu';
import Header from './Header';
import UtloggingNavigasjon from './UtloggingNavigasjon';
import UtloggingsvarselTekstInnhold from './UtloggingsvarselTekstInnhold';
import UtloggingsvarselValg from './UtloggingsvarselValg';
import Nedteller from './Nedteller';
import { WindowType } from './ResizeHandler';
import BEMHelper from '../../../../utils/bem';
import { AppState } from '../../../../store/reducers';
import { useSelector } from 'react-redux';
import { VarselEkspandert } from '../../../../store/reducers/utloggingsvarsel-duck';

interface Props {
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    windowType: WindowType;
    overskrift: string;
    tid: string;
}

const stateSelector = (state: AppState) => ({
    utloggingsvarsel: state.utloggingsvarsel
});

const UtloggingsvarselInnhold: FunctionComponent<Props> = (props) => {
    const { utloggingsvarsel } = useSelector(stateSelector);
    const { setModalOpen, overskrift, tid } = props;
    const cls = BEMHelper('utloggingsvarsel');
    const htmlUUdisable = utloggingsvarsel.varselState === VarselEkspandert.MINIMERT;

    return (
        <>
            <LiteEkspanderbartvindu
                setModalOpen={setModalOpen}
                typoGrafi='normaltekst'
                tid={tid}
                visFullTekst={true}
            />
            <div className={cls.element('main-wrapper')}
                 aria-hidden={utloggingsvarsel.varselState === VarselEkspandert.MINIMERT}>
                <Header />
                <div className={cls.element('container')}>
                    <UtloggingNavigasjon />
                    <UtloggingsvarselTekstInnhold overskrift={overskrift} />
                    <UtloggingsvarselValg htmlUUDisable={htmlUUdisable} />
                    <Nedteller
                        typoGrafi='normaltekst'
                        tekst={'Du blir automatisk logget ut om '.concat(tid)}
                        subClass={'main'}
                    />
                </div>
            </div>
        </>
    );
};
export default UtloggingsvarselInnhold;
