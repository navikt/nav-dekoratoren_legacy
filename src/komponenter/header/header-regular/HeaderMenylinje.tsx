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
import { Hovedmeny } from 'komponenter/header/header-regular/Hovedmeny';
import { HovedmenyKnapp } from 'komponenter/header/header-regular/common/knapper/hovedmeny-knapp/HovedmenyKnapp';
import { SokKnapp } from 'komponenter/header/header-regular/common/knapper/sok-knapp/SokKnapp';
import { MinsideKnapp } from 'komponenter/header/header-regular/common/knapper/minside-knapper/MinsideKnapp';
import { VarslerKnapp } from 'komponenter/header/header-regular/common/knapper/varsler-knapp/VarslerKnapp';
import 'komponenter/header/header-regular/HeaderMenylinje.less';

export const headerLogoId = 'header-logo-id';
export const desktopHovedmenyKnappId = 'desktop-hovedmeny-knapp-id';
export const mobilHovedmenyKnappId = 'mobil-hovedmeny-knapp-id';

const stateSelector = (state: AppState) => ({
    innlogget: state.innloggingsstatus.data.authenticated,
    arbeidsflate: state.arbeidsflate.status,
});

export const HeaderMenylinje = () => {
    const cls = BEMHelper('header-linje');
    const { innlogget, arbeidsflate } = useSelector(stateSelector);
    const kbNavMainState = useKbNavMain();

    const innloggetPrivatperson =
        innlogget && arbeidsflate === MenuValue.PRIVATPERSON;

    return (
        <nav className={cls.className} aria-label={'Hovedmeny'}>
            <div className={cls.element('knapper')}>
                <NavLogoLenke
                    gaEventArgs={{
                        context: arbeidsflate,
                        category: GACategory.Header,
                        action: 'navlogo',
                    }}
                    id={headerLogoId}
                />
                <HovedmenyKnapp id={desktopHovedmenyKnappId} />
                <SokKnapp />
                <span className={cls.element('spacer')} />
                {innloggetPrivatperson && <VarslerKnapp />}
                {innlogget && <MinsideKnapp arbeidsflate={arbeidsflate} />}
                <LoggInnKnapp />
                <HovedmenyKnapp id={mobilHovedmenyKnappId} />
            </div>
            <div className={cls.element('menyer')}>
                <Hovedmeny kbNavMainState={kbNavMainState} />
                <SokDropdown kbNavMainState={kbNavMainState} />
                {innloggetPrivatperson && (
                    <VarslerDropdown kbNavMainState={kbNavMainState} />
                )}
                {innloggetPrivatperson && (
                    <MinsideMeny kbNavMainState={kbNavMainState} />
                )}
            </div>
        </nav>
    );
};
