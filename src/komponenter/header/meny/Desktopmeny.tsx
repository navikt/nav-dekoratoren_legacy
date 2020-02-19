import React from 'react';
import BEMHelper from '../../../utils/bem';
import { Language } from '../../../reducer/language-duck';
import VarselinnboksProvider from '../../../provider/Varselinnboks-provider';
import InnloggingsstatusProvider from '../../../provider/Innloggingsstatus-provider';
import NavLogoRod from '../../../ikoner/meny/NavLogoRod';
import Ekspanderbarmeny from './ekspanderbar-meny/Ekspanderbarmeny';
import Sok from './sok/Sok';
import MinsideLenke from './minside-lenke/MinsideLenke';
import LoggInnKnapp from './logginn/Logg-inn-knapp';
import Varselbjelle from './varsel/Varselbjelle';
import VarselVisning from './varsel/varselvisning/Varselvisning';
import './Desktopmeny.less';

const desktopmeny = BEMHelper('desktopmeny');

interface Props {
    language: Language;
}

const Desktopmeny = ({ language }: Props) => {
    return (
        <nav className={desktopmeny.className} aria-label="Hovedmeny">
            <div className={desktopmeny.element('content')}>
                <div className={desktopmeny.element('elementer')}>
                    <NavLogoRod
                        width="88"
                        height="88"
                        classname={desktopmeny.element('nav-brand')}
                    />
                    {language === Language.NORSK ||
                    language === Language.ENGELSK ? (
                        <Ekspanderbarmeny />
                    ) : null}
                    <Sok />
                    <InnloggingsstatusProvider>
                        <>
                            <div className="media-lg-desktop minsidelenke-varselbjelle">
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
                            </div>
                            <LoggInnKnapp />
                        </>
                    </InnloggingsstatusProvider>
                </div>
            </div>
        </nav>
    );
};

export default Desktopmeny;
