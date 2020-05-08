import React from 'react';
import BEMHelper from 'utils/bem';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import { LenkeMedGA } from 'komponenter/common/LenkeMedGA';
import { GACategory } from 'utils/google-analytics';
import './MinsideKnapper.less';

import briefcaseIkon from 'ikoner/meny/Briefcase_icon_nav.svg';

type Props = {
    classname: string;
    id: string;
    href: string;
};

export const MinsideArbgiverKnapp = (props: Props) => {
    const { classname, id, href } = props;
    const cls = BEMHelper(classname);

    return (
        <LenkeMedGA
            classNameOverride={`menylinje-knapp ${cls.element('knapp')}`}
            id={id}
            href={href}
            gaEventArgs={{
                category: GACategory.Header,
                action: 'minside-arbeidsgiver',
                label: href,
            }}
            tabIndex={0}
        >
            <div
                className={`menylinje-knapp-visning ${cls.element(
                    'knapp-visning'
                )}`}
            >
                <img src={briefcaseIkon} alt="" />
                <div className={cls.element('knapp-tekst')}>
                    <Normaltekst className={cls.element('knapp-tekst-topp')}>
                        <Tekst id={'ga-til-min-side'} />
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
