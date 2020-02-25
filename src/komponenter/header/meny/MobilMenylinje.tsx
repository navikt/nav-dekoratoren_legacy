import React, { useEffect, useState } from 'react';
import BEMHelper from '../../../utils/bem';
import InnloggingsstatusProvider from '../../../provider/Innloggingsstatus-provider';
import NavLogoRod from '../../../ikoner/meny/NavLogoRod';
import HovedmenyMobil from './ekspanderende-menyer/hovedmeny-mobil/HovedmenyMobil';
import LoggInnKnapp from './logginn/Logg-inn-knapp';
import SokModal from './sok/sok-innhold/sok-modal/Sokmodal';
import SokModalToggleknapp from './sok/sok-innhold/SokModalToggleknapp';
import './MobilMenylinje.less';
import { verifyWindowObj } from '../../../utils/Environment';
import { tabletview } from '../../../styling-mediaquery';
import { GACategory, triggerGaEvent } from '../../../utils/google-analytics';
import MenyBakgrunn from './ekspanderende-menyer/meny-bakgrunn/MenyBakgrunn';
import { Language } from '../../../reducer/language-duck';

const mobilClass = BEMHelper('mobilmeny');

interface Props {
    language: Language;
}

const MobilMenylinje = ({ language }: Props) => {
    const [clickedModal, setClickedModal] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleModal = () => {
        triggerGaEvent({category: GACategory.Header, action: `mobilsøk-${clickedModal ? 'close' : 'open'}`});
        setClickedModal(!clickedModal);
    };

    const handleResize = () => {
        if (verifyWindowObj() && window.innerWidth >= tabletview) {
            setClickedModal(false);
        }
    };

    return (
        <nav className={mobilClass.className} aria-label="Hovedmeny">
            <div className={mobilClass.element('content')}>
                <div className={mobilClass.element('elementer')}>
                    <div className={mobilClass.element('venstre-kolonne')}>
                        <NavLogoRod
                            width="66"
                            height="66"
                            classname={mobilClass.element('logo')}
                        />
                    </div>
                    <div className={mobilClass.element('hoyre-kolonne')}>
                        {language === Language.NORSK ||
                        language === Language.ENGELSK ? (
                            <HovedmenyMobil />
                        ) : null}
                        <SokModalToggleknapp
                            className={mobilClass.element('sok')}
                            modalIsOpen={toggleModal}
                        />
                        <InnloggingsstatusProvider>
                            <LoggInnKnapp />
                        </InnloggingsstatusProvider>
                        <MenyBakgrunn className={'mobilmeny'}/>
                    </div>
                </div>
            </div>

            <SokModal
                modalerApen={clickedModal}
                sokeknappToggle={toggleModal}
            />
        </nav>
    );
};

export default MobilMenylinje;
