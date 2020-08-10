import React from 'react';
import BEMHelper from 'utils/bem';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import { LenkeMedGA } from 'komponenter/common/lenke-med-ga/LenkeMedGA';
import { GACategory } from 'utils/google-analytics';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { valgtbedrift } from 'komponenter/common/arbeidsflate-lenker/hovedmeny-arbeidsflate-lenker';
import { minsideMenyClassname } from 'komponenter/header/header-regular/desktop/minside-meny/Minsidemeny';
import { minsideKnappId } from 'komponenter/header/header-regular/desktop/minside-meny/Minsidemeny';
import './MinsideKnapp.less';

import briefcaseIkon from 'ikoner/meny/Briefcase_icon_nav.svg';
import { Bilde } from 'komponenter/common/bilde/Bilde';

export const MinsideArbgiverKnapp = () => {
    const { environment } = useSelector((state: AppState) => state);
    const href = environment.MINSIDE_ARBEIDSGIVER_URL + valgtbedrift();
    const cls = BEMHelper(minsideMenyClassname);

    return (
        <LenkeMedGA
            classNameOverride={`menylinje-knapp ${cls.element('knapp')}`}
            id={minsideKnappId}
            href={href}
            gaEventArgs={{
                category: GACategory.Header,
                action: 'minside-arbeidsgiver',
                label: href,
            }}
        >
            <div
                className={`menylinje-knapp-visning ${cls.element(
                    'knapp-visning'
                )}`}
            >
                <Bilde asset={briefcaseIkon} altText="" />
                <div className={cls.element('knapp-tekst')}>
                    <Normaltekst className={cls.element('knapp-tekst-topp')}>
                        <Tekst id={'ga-til-min-side-arbeidsgiver'} />
                    </Normaltekst>
                    <Undertekst className={cls.element('knapp-tekst-bunn')}>
                        <Tekst id={'rolle-arbeidsgiver'} />
                    </Undertekst>
                </div>
            </div>
        </LenkeMedGA>
    );
};

export default MinsideArbgiverKnapp;
