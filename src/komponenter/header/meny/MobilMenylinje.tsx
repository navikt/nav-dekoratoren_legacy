import React, { useEffect, useState } from 'react';
import BEMHelper from '../../../utils/bem';
import InnloggingsstatusProvider from '../../../provider/Innloggingsstatus-provider';
import NavLogoRod from '../../../ikoner/meny/NavLogoRod';
import HovedmenyMobil from './ekspanderende-menyer/hovedmeny-mobil/HovedmenyMobil';
import LoggInnKnapp from './logginn/Logg-inn-knapp';
import SokModal from './sok/sok-innhold/sok-modal/Sokmodal';
import './MobilMenylinje.less';
import { verifyWindowObj } from '../../../utils/Environment';
import { tabletview } from '../../../styling-mediaquery';
import { GACategory, triggerGaEvent } from '../../../utils/google-analytics';
import { Language } from '../../../reducer/language-duck';
import { useSelector } from 'react-redux';
import { AppState } from '../../../reducer/reducer';
import VarselinnboksProvider from '../../../provider/Varselinnboks-provider';
import Varselbjelle from './varsel/Varselbjelle';
import Tekst from '../../../tekster/finn-tekst';
import { Normaltekst } from 'nav-frontend-typografi';

const mobilClass = BEMHelper('mobilmeny');

interface Props {
    language: Language;
}
const stateSelector = (state: AppState) => ({
    innloggingsstatus: state.innloggingsstatus,
});

const MobilMenylinje = ({ language }: Props) => {
    const { innloggingsstatus } = useSelector(stateSelector);
    const [navIkonSize, setNavIkonSize] = useState<string>('66');
    const [varselClicked, setVarselClicked] = useState<boolean>(false);
    const [handleVarselvisning, setHandleVarselvisning] = useState<any>(void 0);

    useEffect(() => {
        if (verifyWindowObj()) {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const toggleModal = (
        isOpen: boolean,
        handlevarsel: (() => void) | undefined
    ) => {
        triggerGaEvent({
            category: GACategory.Header,
            action: `varselvisning-${isOpen ? 'open' : 'close'}`,
        });
        if (handlevarsel) {
            setHandleVarselvisning(handlevarsel);
        }

        setVarselClicked(isOpen);
    };

    const handleResize = () => {
        if (window.innerWidth >= tabletview) {
            setVarselClicked(false);
        }
        window.innerWidth <= 400 ? setNavIkonSize('66') : setNavIkonSize('66');
    };

    return (
        <nav className={mobilClass.className} aria-label="Hovedmeny">
            <div className={mobilClass.element('content')}>
                <div className={mobilClass.element('elementer')}>
                    <div className={mobilClass.element('venstre-kolonne')}>
                        <NavLogoRod
                            width={navIkonSize}
                            height={navIkonSize}
                            classname={mobilClass.element('logo')}
                        />
                    </div>
                    <div className={mobilClass.element('hoyre-kolonne')}>
                        {!innloggingsstatus.data.authenticated ? (
                            <InnloggingsstatusProvider>
                                <LoggInnKnapp />
                            </InnloggingsstatusProvider>
                        ) : (
                            <VarselinnboksProvider>
                                <>
                                    <Varselbjelle tabindex={true} />
                                </>
                            </VarselinnboksProvider>
                        )}
                        {language === Language.NORSK ||
                        language === Language.ENGELSK ? (
                            <HovedmenyMobil />
                        ) : null}

                        <InnloggingsstatusProvider>
                            <LoggInnKnapp />
                        </InnloggingsstatusProvider>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MobilMenylinje;
