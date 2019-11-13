import React from 'react';
import BEMHelper from '../../../utils/bem';
import NavLogoRod from '../../ikoner/meny/NavLogoRod';
import DropdownMeny from './dropdown-meny/DropdownMeny';
import SokIkon from '../../ikoner/mobilmeny/SokIkon';
import { Undertittel } from 'nav-frontend-typografi';
import Tekst from '../../../tekster/finn-tekst';
import InnloggingsstatusProvider from '../../../provider/Innloggingsstatus-provider';
import LoggInnKnapp from './logginn/Logg-inn-knapp';
import './Mobilmeny.less';

const mobilClass = BEMHelper('mobilmeny');

const Mobilmeny = () => {
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
                        <DropdownMeny classname={mobilClass.className} />
                        <SokKnapp className={mobilClass.element('sok')} />
                        <InnloggingsstatusProvider>
                            <LoggInnKnapp />
                        </InnloggingsstatusProvider>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export const SokKnapp = ({ className }: { className: string }) => {
    return (
        <button className={className}>
            <SokIkon />
            <Undertittel>
                <Tekst id="sok-mobil-knapp" />
            </Undertittel>
        </button>
    );
};

export default Mobilmeny;
