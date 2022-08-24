import React from 'react';
import BEMHelper from 'utils/bem';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import { useKbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import NavLogoLenke from 'komponenter/common/nav-logo/NavLogoLenke';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import DesktopSokKnapp from 'komponenter/header/header-regular/desktop/sok-dropdown/SokDropdown';
import DesktopMinsidemenyKnapp from 'komponenter/header/header-regular/desktop/minside-meny/Minsidemeny';
import LoggInnKnapp from 'komponenter/header/header-regular/common/logg-inn/LoggInnKnapp';
import VarslerKnapp from 'komponenter/header/header-regular/common/varsler/Varsler';
import { MenuValue } from 'utils/meny-storage-utils';
import DesktopHovedmenyKnapp from 'komponenter/header/header-regular/desktop/hovedmeny/Hovedmeny';
import MobilMenyKnapp from 'komponenter/header/header-regular/mobil/HovedmenyMobil';
import { Status } from 'api/api';
import MinsideArbgiverKnapp from 'komponenter/header/header-regular/desktop/minside-meny/minside-knapper/MinsideArbgiverKnapp';
import Logo from 'ikoner/meny/nav-logo-red.svg';
import { Locale } from 'store/reducers/language-duck';
import Arbeidsflatemeny from './desktop/arbeidsflatemeny/Arbeidsflatemeny';

import './HeaderMenylinje.less';

export const headerLogoId = 'header-logo-id';

const stateSelector = (state: AppState) => ({
    innlogget: state.innloggingsstatus.data.authenticated,
    innloggingsstatus: state.innloggingsstatus.status,
    arbeidsflate: state.arbeidsflate.status,
    language: state.language.language,
});

const NavLogo = ({ arbeidsflate }: { arbeidsflate: MenuValue }) => (
    <NavLogoLenke
        analyticsEventArgs={{
            context: arbeidsflate,
            category: AnalyticsCategory.Header,
            action: 'navlogo',
        }}
        id={headerLogoId}
        ikon={Logo}
    />
);

export const HeaderMenylinje = () => {
    const cls = BEMHelper('header-linje');
    const { innlogget, innloggingsstatus, arbeidsflate, language } = useSelector(stateSelector);
    const kbNavMainState = useKbNavMain();

    const innloggetPrivatperson = innlogget && arbeidsflate === MenuValue.PRIVATPERSON;
    const innloggetArbeidsgiver = innlogget && arbeidsflate === MenuValue.ARBEIDSGIVER;
    const isLanguageNorwegian = language === Locale.BOKMAL || language === Locale.NYNORSK;

    const visMinsideKnapper = innloggetPrivatperson || innloggetArbeidsgiver;

    return (
        // OBS: Id-en "Hovedmeny" benyttes til å bestemme høyden til menyen av andre team
        <nav className={cls.className} id="hovedmeny" aria-label={'Hovedmeny'}>
            <div className={cls.element('elementer')}>
                <NavLogo arbeidsflate={arbeidsflate} />
                {isLanguageNorwegian && <Arbeidsflatemeny />}
                <div className={cls.element('hoyre-knapper')}>
                    <div className={cls.element('uinnlogget-knapper')}>
                        <DesktopHovedmenyKnapp kbNavMainState={kbNavMainState} />
                        <DesktopSokKnapp kbNavMainState={kbNavMainState} />
                    </div>
                    <MobilMenyKnapp />
                    {visMinsideKnapper && (
                        <div className={cls.element('minside-knapper')}>
                            {innloggetPrivatperson && <VarslerKnapp kbNavMainState={kbNavMainState} />}
                            {innloggetPrivatperson && <DesktopMinsidemenyKnapp kbNavMainState={kbNavMainState} />}
                            {innloggetArbeidsgiver && <MinsideArbgiverKnapp />}
                            {innloggingsstatus === Status.OK && <LoggInnKnapp />}
                        </div>
                    )}
                    {!visMinsideKnapper && <LoggInnKnapp />}
                </div>
            </div>
        </nav>
    );
};
