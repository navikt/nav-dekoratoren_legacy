import React from 'react';
import BEMHelper from 'utils/bem';
import { Language } from 'store/reducers/language-duck';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { MenuValue } from 'utils/meny-storage-utils';
import { Status } from 'api/api';
import LoggInnKnapp from 'komponenter/header/header-regular/common/knapper/logg-inn-knapp/LoggInnKnapp';
import NavLogoLenke from 'komponenter/common/nav-logo/NavLogoLenke';
import { GACategory } from 'utils/google-analytics';
import { VarslerKnapp } from 'komponenter/header/header-regular/common/knapper/varsler-knapp/VarslerKnapp';
import './MobilMenylinje.less';

interface Props {
    language: Language;
}

const stateSelector = (state: AppState) => ({
    innlogga: state.innloggingsstatus.data.authenticated,
    innloggingsstatus: state.innloggingsstatus.status,
    arbeidsflate: state.arbeidsflate.status,
});

const MobilMenylinje = ({ language }: Props) => {
    const cls = BEMHelper('mobilmeny');
    const { innlogga, innloggingsstatus, arbeidsflate } = useSelector(
        stateSelector
    );

    const harLasta =
        innloggingsstatus !== Status.IKKE_STARTET &&
        innloggingsstatus !== Status.PENDING;

    const visInnloggingsKnapp = harLasta && !innlogga;

    const visVarslerDropdown =
        harLasta && innlogga && arbeidsflate === MenuValue.PRIVATPERSON;

    return (
        <nav
            className={cls.className}
            id={cls.className}
            aria-label="Hovedmeny"
        >
            <div className={cls.element('elementer')}>
                <NavLogoLenke
                    gaEventArgs={{
                        context: arbeidsflate,
                        category: GACategory.Header,
                        action: 'navlogo',
                    }}
                />
                <div className={cls.element('hoyre-kolonne')}>
                    {visInnloggingsKnapp && <LoggInnKnapp type={'flat'} />}
                    {visVarslerDropdown && (
                        <VarslerKnapp
                            dropdownClassname={'mobilmeny__varsel-innhold'}
                        />
                    )}
                    {/*<HovedmenyMobil />*/}
                </div>
            </div>
        </nav>
    );
};

export default MobilMenylinje;
