import React from 'react';
import BEMHelper from '../../../utils/bem';
import { Language } from '../../../reducer/language-duck';
import VarselinnboksProvider from '../../../provider/Varselinnboks-provider';
import InnloggingsstatusProvider from '../../../provider/Innloggingsstatus-provider';
import NavLogoRod from '../../../ikoner/meny/NavLogoRod';
import Sok from './sok/Sok';
import MinsideLenke from './minside-lenke/MinsideLenke';
import LoggInnKnapp from './logginn/Logg-inn-knapp';
import Varselbjelle from './varsel/Varselbjelle';
import VarselVisning from './varsel/varselvisning/Varselvisning';
import './DesktopMenylinje.less';
import { DesktopUinnloggetMeny } from './ekspanderende-menyer/meny-uinnlogget-desktop/DesktopUinnloggetMeny';
import { SokDropdown } from './sok/SokDropdown';

const desktopMenylinje = BEMHelper('desktopmeny');

interface Props {
    language: Language;
}

const DesktopMenylinje = ({ language }: Props) => {
    return (
        <nav className={desktopMenylinje.className} aria-label="Hovedmeny">
            <div className={desktopMenylinje.element('content')}>
                <div className={desktopMenylinje.element('elementer')}>
                    <NavLogoRod
                        width="88"
                        height="88"
                        classname={desktopMenylinje.element('nav-brand')}
                    />
                    {(language === Language.NORSK || language === Language.ENGELSK) && (
                        <DesktopUinnloggetMeny />
                    )}
                    <SokDropdown />
                    <span className={desktopMenylinje.element('spacer')}/>
                    <InnloggingsstatusProvider>
                        <>
                            <VarselinnboksProvider>
                                <Varselbjelle tabindex={true}>
                                    {clicked =>
                                        clicked && (
                                            <VarselVisning
                                                tabIndex={true}
                                            />
                                        )
                                    }
                                </Varselbjelle>
                            </VarselinnboksProvider>
                            <MinsideLenke tabindex={true} />
                            <LoggInnKnapp />
                        </>
                    </InnloggingsstatusProvider>
                </div>
            </div>
        </nav>
    );
};

export default DesktopMenylinje;
