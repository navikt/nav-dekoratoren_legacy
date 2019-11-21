import React, { useState } from 'react';
import BEMHelper from '../../../utils/bem';
import NavLogoRod from '../../ikoner/meny/NavLogoRod';
import DropdownMeny from './ekspanderbar-meny/Ekspanderbarmeny';
import InnloggingsstatusProvider from '../../../provider/Innloggingsstatus-provider';
import LoggInnKnapp from './logginn/Logg-inn-knapp';
import './Mobilmeny.less';
import SokModal from './sok/sok-modal/Sokmodal';
import SokKnapp from './sok/sok-knapp/SokKnapp';

const mobilClass = BEMHelper('mobilmeny');

const Mobilmeny = () => {
    const [clickedModal, setClickedModal] = useState<boolean>(false);

    const toggleModal = () => {
        setClickedModal(!clickedModal);
    };

    return (
        <nav className={mobilClass.className}>
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
                        <DropdownMeny />
                        <SokKnapp
                            className={mobilClass.element('sok')}
                            modalIsOpen={toggleModal}
                        />
                        <InnloggingsstatusProvider>
                            <LoggInnKnapp />
                        </InnloggingsstatusProvider>
                    </div>
                </div>
            </div>
            <SokModal modalerApen={clickedModal} sokekappToggle={toggleModal} />
            <div id="modal-ancor-block" />
            <div id="main" />
        </nav>
    );
};

export default Mobilmeny;
