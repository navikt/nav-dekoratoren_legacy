import React from 'react';
import BEMHelper from 'utils/bem';
import VarselinnboksProvider from 'store/providers/Varselinnboks';
import InnloggingsstatusProvider from 'store/providers/Innloggingsstatus';
import NavLogoRod from 'ikoner/meny/NavLogoRod';
import LoggInnKnapp from './logginn/Logg-inn-knapp';
import { SokDropdown } from './ekspanderende-menyer/sok-dropdown-desktop/SokDropdown';
import { HovedmenyDesktop } from './ekspanderende-menyer/hovedmeny-desktop/HovedmenyDesktop';
import MinsideMenyDesktop from './ekspanderende-menyer/minside-meny-desktop/MinsideMenyDesktop';
import { VarslerDropdown } from './ekspanderende-menyer/varsler-dropdown-desktop/VarslerDropdown';
import './DesktopMenylinje.less';

const desktopMenylinje = BEMHelper('desktopmeny');

const DesktopMenylinje = () => {
    return (
        <div className={desktopMenylinje.className} aria-label="Hovedmeny">
            <div className={desktopMenylinje.element('content')}>
                <div className={desktopMenylinje.element('elementer')}>
                    <NavLogoRod
                        width="88"
                        height="88"
                        classname={desktopMenylinje.element('nav-brand')}
                    />
                    <HovedmenyDesktop />
                    <SokDropdown />
                    <span className={desktopMenylinje.element('spacer')} />
                    <InnloggingsstatusProvider>
                        <>
                            <VarselinnboksProvider>
                                <VarslerDropdown />
                            </VarselinnboksProvider>

                            <MinsideMenyDesktop />
                            <LoggInnKnapp />
                        </>
                    </InnloggingsstatusProvider>
                </div>
            </div>
        </div>
    );
};

export default DesktopMenylinje;
