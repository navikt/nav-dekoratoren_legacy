import React, { useEffect, useState } from 'react';
import BEMHelper from '../../../utils/bem';
import InnloggingsstatusProvider from '../../../provider/Innloggingsstatus-provider';
import NavLogoRod from '../../../ikoner/meny/NavLogoRod';
import Ekspanderbarmeny from './ekspanderbar-meny/Ekspanderbarmeny';
import LoggInnKnapp from './logginn/Logg-inn-knapp';
import SokModal from './sok/sok-innhold/sok-modal/Sokmodal';
import SokModalToggleknapp from './sok/sok-innhold/SokModalToggleknapp';
import './Mobilmeny.less';
import { verifyWindowObj } from '../../../utils/Environment';
import { tabletview } from '../../../styling-mediaquery';
import { GACategory, triggerGaEvent } from '../../../utils/google-analytics';

const mobilClass = BEMHelper('mobilmeny');

const Mobilmeny = () => {
    const [clickedModal, setClickedModal] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleModal = () => {
        triggerGaEvent({
            category: GACategory.Header,
            action: `mobilsøk-${clickedModal ? 'close' : 'open'}`,
        });
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
                        <Ekspanderbarmeny />
                        <SokModalToggleknapp
                            className={mobilClass.element('sok')}
                            modalIsOpen={toggleModal}
                        />
                        <InnloggingsstatusProvider>
                            <LoggInnKnapp />
                        </InnloggingsstatusProvider>
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

export default Mobilmeny;
