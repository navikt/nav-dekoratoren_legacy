import React from 'react';
import BEMHelper from 'utils/bem';
import NavLogoRod from 'ikoner/meny/NavLogoRod';
import { Language } from 'store/reducers/language-duck';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import HovedmenyMobil from './hovedmeny/HovedmenyMobil';
import { LoggInnKnappMobil } from './logg-inn/LoggInnKnappMobil';
import { VarslerKnapp } from 'komponenter/header/header-regular/common/meny-knapper/varsler-knapp/VarslerKnapp';
import { MenuValue } from 'utils/meny-storage-utils';
import { Status } from 'api/api';
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
    const innlogga = innloggingsstatus.data.authenticated;
    const arbeidsflate = useSelector(
        (state: AppState) => state.arbeidsflate.status
    );

    const harLasta =
        innloggingsstatus.status !== Status.IKKE_STARTET &&
        innloggingsstatus.status !== Status.PENDING;

    const visInnloggingsKnapp = harLasta && !innlogga;

    const visVarslerDropdown =
        harLasta && innlogga && arbeidsflate === MenuValue.PRIVATPERSON;

    const visHovedMeny =
        language === Language.NORSK || language === Language.ENGELSK;

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
                        {visInnloggingsKnapp && <LoggInnKnappMobil />}
                        {visVarslerDropdown && <VarslerKnapp />}
                        {visHovedMeny && <HovedmenyMobil />}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MobilMenylinje;
