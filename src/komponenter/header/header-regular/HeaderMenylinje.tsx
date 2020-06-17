import React from 'react';
import BEMHelper from 'utils/bem';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import { useKbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import NavLogoLenke from 'komponenter/common/nav-logo/NavLogoLenke';
import { GACategory } from 'utils/google-analytics';
import { SokDropdown } from 'komponenter/header/header-regular/desktop/sok-dropdown/SokDropdown';
import { MinsideMeny } from 'komponenter/header/header-regular/desktop/minside-meny/MinsideMeny';
import LoggInnKnapp from 'komponenter/header/header-regular/common/knapper/logg-inn-knapp/LoggInnKnapp';
import { VarslerDropdown } from 'komponenter/header/header-regular/varsler/VarslerDropdown';
import { MenuValue } from 'utils/meny-storage-utils';
import { HovedmenyDesktop } from 'komponenter/header/header-regular/desktop/hovedmeny/HovedmenyDesktop';
import { HovedmenyMobil } from 'komponenter/header/header-regular/mobil/hovedmeny/HovedmenyMobil';
import { Status } from 'api/api';
import 'komponenter/header/header-regular/HeaderMenylinje.less';

export const headerLogoId = 'header-logo-id';

const stateSelector = (state: AppState) => ({
    innlogget: state.innloggingsstatus.data.authenticated,
    innloggingsstatus: state.innloggingsstatus.status,
    arbeidsflate: state.arbeidsflate.status,
});

export const HeaderMenylinje = () => {
    const cls = BEMHelper('header-linje');
    const { innlogget, innloggingsstatus, arbeidsflate } = useSelector(
        stateSelector
    );
    const kbNavMainState = useKbNavMain();

    const innloggetPrivatperson =
        innlogget && arbeidsflate === MenuValue.PRIVATPERSON;

    return (
        <nav className={cls.className} aria-label={'Hovedmeny'}>
            <div className={cls.element('elementer')}>
                <NavLogoLenke
                    gaEventArgs={{
                        context: arbeidsflate,
                        category: GACategory.Header,
                        action: 'navlogo',
                    }}
                    id={headerLogoId}
                />
                <HovedmenyDesktop kbNavMainState={kbNavMainState} />
                <SokDropdown kbNavMainState={kbNavMainState} />
                <span className={cls.element('spacer')} />
                {innloggetPrivatperson && (
                    <VarslerDropdown kbNavMainState={kbNavMainState} />
                )}
                {innlogget && <MinsideMeny kbNavMainState={kbNavMainState} />}
                {innloggingsstatus === Status.OK && <LoggInnKnapp />}
                <HovedmenyMobil />
            </div>
        </nav>
    );
};
