import React from 'react';
import BEMHelper from 'utils/bem';
import Lock from 'ikoner/meny/Lock';
import Tekst from 'tekster/finn-tekst';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Normaltekst } from 'nav-frontend-typografi';

type Props = {
    classname: string;
};

export const MinsideDropdownLockMsg = (props: Props) => {
    const cls = BEMHelper(props.classname);
    return (
        <div className={cls.element('lock-msg-container')}>
            <Lock height={'24px'} width={'24px'} color={'#000'} />
            <div className={cls.element('lock-msg-infotekst')}>
                <Normaltekst>
                    <Tekst id={'lock-msg-infotekst'} />
                </Normaltekst>
            </div>
            <div className={cls.element('lock-msg-hjelpetekst')}>
                <Hjelpetekst>
                    <Tekst id={'lock-msg-hjelpetekst'} />
                </Hjelpetekst>
            </div>
        </div>
    );
};

export default MinsideDropdownLockMsg;
