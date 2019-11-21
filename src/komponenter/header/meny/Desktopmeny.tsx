import React from 'react';
import BEMHelper from '../../../utils/bem';
import { Undertittel } from 'nav-frontend-typografi';
import VarselinnboksProvider from '../../../provider/Varselinnboks-provider';
import InnloggingsstatusProvider from '../../../provider/Innloggingsstatus-provider';
import NavLogoRod from '../../ikoner/meny/NavLogoRod';
import DropdownMeny from './dropdown-meny/DropdownMeny';
import Sok from './sok/Sok';
import MinsideLenke from './minside-lenke/MinsideLenke';
import Varselbjelle from './varsel/Varselbjelle';
import LoggInnKnapp from './logginn/Logg-inn-knapp';
import { Language } from '../../../reducer/language-duck';
import Tekst from '../../../tekster/finn-tekst';
import './Desktopmeny.less';
import VarselVisning from './varsel/varsel-visning/Varselvisning';
import MediaQuery from 'react-responsive';
import { tabletview } from '../../../api/api';

const hovedmenyClass = BEMHelper('hovedmeny');
export const dropdownClass = BEMHelper('dropdown');

interface Props {
    language: Language;
}

const Hovedmeny = ({ language }: Props) => {
    return (
        <nav className={hovedmenyClass.className}>
            <div className={hovedmenyClass.element('content')}>
                <div className={hovedmenyClass.element('elementer')}>
                    <NavLogoRod
                        width="88"
                        height="88"
                        classname={hovedmenyClass.element('nav-brand')}
                    />
                    {language === Language.NORSK ||
                    language === Language.ENGELSK ? (
                        <DropdownMeny classname={dropdownClass.className} />
                    ) : null}
                    <Sok />
                    <InnloggingsstatusProvider>
                        <>
                            <MediaQuery minWidth={tabletview - 1}>
                                <MinsideLenke />
                                <VarselinnboksProvider>
                                    <Varselbjelle>
                                        {clicked =>
                                            clicked && <VarselVisning />
                                        }
                                    </Varselbjelle>
                                </VarselinnboksProvider>
                            </MediaQuery>

                            <LoggInnKnapp />
                        </>
                    </InnloggingsstatusProvider>
                </div>
            </div>
        </nav>
    );
};

export default Hovedmeny;
