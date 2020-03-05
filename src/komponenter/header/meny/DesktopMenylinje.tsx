import React from 'react';
import BEMHelper from '../../../utils/bem';
import VarselinnboksProvider from '../../../provider/Varselinnboks-provider';
import InnloggingsstatusProvider from '../../../provider/Innloggingsstatus-provider';
import NavLogoRod from '../../../ikoner/meny/NavLogoRod';
import MinsideLenke, {
    minsideMenyDesktopClassname,
} from './ekspanderende-menyer/minside-meny-desktop/MinsideMenyDesktop';
import LoggInnKnapp from './logginn/Logg-inn-knapp';
import Varselbjelle from './varsel/Varselbjelle';
import VarselVisning from './varsel/varselvisning/Varselvisning';
import './DesktopMenylinje.less';
import {
    SokDropdown,
    sokDropdownDesktopClassname,
} from './ekspanderende-menyer/sok-dropdown-desktop/SokDropdown';
import {
    HovedmenyDesktop,
    hovedmenyDesktopClassname,
} from './ekspanderende-menyer/hovedmeny-desktop/HovedmenyDesktop';
import {
    createNode,
    NaviGroup,
    NodeEdge,
} from '../../../utils/keyboard-navigation/kb-navigation';

const desktopMenylinje = BEMHelper('desktopmeny');

const DesktopMenylinje = () => {
    const rootNodes = {
        [NaviGroup.DesktopHovedmeny]: createNode(
            BEMHelper(hovedmenyDesktopClassname).element('knapp'),
            { col: 0, row: 0, sub: 0 }
        ),
        [NaviGroup.DesktopSokDropdown]: createNode(
            BEMHelper(sokDropdownDesktopClassname).element('knapp'),
            { col: 1, row: 0, sub: 0 }
        ),
        [NaviGroup.DesktopVarslerDropdown]: createNode(
            BEMHelper('toggle-varsler-container').element('knapp'),
            { col: 2, row: 0, sub: 0 }
        ),
        [NaviGroup.DesktopMinsideMeny]: createNode(
            BEMHelper(minsideMenyDesktopClassname).element('knapp'),
            { col: 3, row: 0, sub: 0 }
        ),
    };

    // @ts-ignore
    rootNodes[NaviGroup.DesktopHovedmeny].connect(
        rootNodes[NaviGroup.DesktopSokDropdown],
        NodeEdge.Right
    );
    // @ts-ignore
    rootNodes[NaviGroup.DesktopSokDropdown].connect(
        rootNodes[NaviGroup.DesktopVarslerDropdown],
        NodeEdge.Right
    );
    // @ts-ignore
    rootNodes[NaviGroup.DesktopVarslerDropdown].connect(
        rootNodes[NaviGroup.DesktopMinsideMeny],
        NodeEdge.Right
    );

    return (
        <nav className={desktopMenylinje.className} aria-label="Hovedmeny">
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
                                <Varselbjelle>
                                    {clicked =>
                                        clicked && (
                                            <VarselVisning tabIndex={true} />
                                        )
                                    }
                                </Varselbjelle>
                            </VarselinnboksProvider>
                            <MinsideLenke />
                            <LoggInnKnapp />
                        </>
                    </InnloggingsstatusProvider>
                </div>
            </div>
        </nav>
    );
};

export default DesktopMenylinje;
