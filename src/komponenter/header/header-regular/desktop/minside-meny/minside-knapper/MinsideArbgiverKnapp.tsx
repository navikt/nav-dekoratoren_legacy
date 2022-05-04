import React from 'react';
import BEMHelper from 'utils/bem';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { valgtbedrift } from 'komponenter/common/arbeidsflate-lenker/hovedmeny-arbeidsflate-lenker';
import { minsideMenyClassname } from 'komponenter/header/header-regular/desktop/minside-meny/Minsidemeny';
import { minsideKnappId } from 'komponenter/header/header-regular/desktop/minside-meny/Minsidemeny';
import { Bilde } from 'komponenter/common/bilde/Bilde';
import './MinsideKnapp.less';

import briefcaseIkon from 'ikoner/meny/Briefcase_icon_nav.svg';

export const MinsideArbgiverKnapp = () => {
    const { environment } = useSelector((state: AppState) => state);
    const href = environment.MINSIDE_ARBEIDSGIVER_URL + valgtbedrift();
    const cls = BEMHelper(minsideMenyClassname);

    return (
        <LenkeMedSporing
            classNameOverride={`${cls.element('knapp')}`}
            id={minsideKnappId}
            href={href}
            analyticsEventArgs={{
                category: AnalyticsCategory.Header,
                action: 'minside-arbeidsgiver',
                label: href,
            }}
        >
            <Bilde asset={briefcaseIkon} altText="" />
            <div className={cls.element('knapp-tekst')} data-testid={'minside-arbeidsgiver'}>
                <Normaltekst className={cls.element('knapp-tekst-topp')}>
                    <Tekst id={'ga-til-min-side-arbeidsgiver'} />
                </Normaltekst>
                <Undertekst className={cls.element('knapp-tekst-bunn')}>
                    <Tekst id={'rolle-arbeidsgiver'} />
                </Undertekst>
            </div>
        </LenkeMedSporing>
    );
};

export default MinsideArbgiverKnapp;
