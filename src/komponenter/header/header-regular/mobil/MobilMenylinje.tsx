import React from 'react';
import BEMHelper from 'utils/bem';
import InnloggingsstatusProvider from 'store/providers/Innloggingsstatus';
import NavLogoRod from 'ikoner/meny/NavLogoRod';
import { Language } from 'store/reducers/language-duck';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import VarselinnboksProvider from 'store/providers/Varselinnboks';
import HovedmenyMobil from './hovedmeny-mobil/HovedmenyMobil';
import { LoggInnKnappMobil } from './logg-inn/LoggInnKnappMobil';
import { VarslerKnapp } from 'komponenter/header/header-regular/common/meny-knapper/varsler-knapp/VarslerKnapp';
import './MobilMenylinje.less';

const mobilClass = BEMHelper('mobilmeny');

interface Props {
    language: Language;
}
const stateSelector = (state: AppState) => ({
    innloggingsstatus: state.innloggingsstatus,
    visVarsel: state.dropdownToggles.varsler,
});

const MobilMenylinje = ({ language }: Props) => {
    const { innloggingsstatus } = useSelector(stateSelector);

    return (
        <nav
            className={mobilClass.className}
            id={mobilClass.className}
            aria-label="Hovedmeny"
        >
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
                        {!innloggingsstatus.data.authenticated ? (
                            <InnloggingsstatusProvider>
                                <LoggInnKnappMobil />
                            </InnloggingsstatusProvider>
                        ) : (
                            <VarselinnboksProvider>
                                <VarslerKnapp />
                            </VarselinnboksProvider>
                        )}
                        {language === Language.NORSK ||
                        language === Language.ENGELSK ? (
                            <HovedmenyMobil />
                        ) : null}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MobilMenylinje;
