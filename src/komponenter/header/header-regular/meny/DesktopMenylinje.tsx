import React from 'react';
import BEMHelper from 'utils/bem';
import VarselinnboksProvider from 'store/providers/Varselinnboks';
import InnloggingsstatusProvider from 'store/providers/Innloggingsstatus';
import NavLogoRod from 'ikoner/meny/NavLogoRod';
import { SokDropdown } from './ekspanderende-menyer/sok-dropdown-desktop/SokDropdown';
import { HovedmenyDesktop } from './ekspanderende-menyer/hovedmeny-desktop/HovedmenyDesktop';
import MinsideMenyDesktop from './ekspanderende-menyer/minside-meny-desktop/MinsideMenyDesktop';
import { VarslerDropdown } from './ekspanderende-menyer/varsler-dropdown-desktop/VarslerDropdown';
import { LoggInnKnappDesktop } from 'komponenter/header/header-regular/meny/logginn/LoggInnKnappDesktop';
import './DesktopMenylinje.less';

const DesktopMenylinje = () => {
    const cls = BEMHelper('desktopmeny');
    return (
        <nav className={cls.className} aria-label="Hovedmeny" id="hovedmeny">
            <div className={cls.element('elementer')}>
                <NavLogoRod
                    width="88"
                    height="88"
                    classname={cls.element('nav-brand')}
                />
                <HovedmenyDesktop />
                <SokDropdown />
                <span className={cls.element('spacer')} />
                <InnloggingsstatusProvider>
                    <>
                        <VarselinnboksProvider>
                            <VarslerDropdown />
                        </VarselinnboksProvider>
                        <MinsideMenyDesktop />
                        <LoggInnKnappDesktop />
                    </>
                </InnloggingsstatusProvider>
            </div>
        </nav>
    );
};

export default DesktopMenylinje;
