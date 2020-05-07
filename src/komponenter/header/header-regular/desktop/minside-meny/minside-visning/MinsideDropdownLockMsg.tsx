import React from 'react';
import BEMHelper from 'utils/bem';
import Tekst from 'tekster/finn-tekst';
import { Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

type Props = {
    classname: string;
};

export const MinsideDropdownLockMsg = (props: Props) => {
    const cls = BEMHelper(props.classname);
    return (
        <div className={cls.element('lock-msg-container')}>
            <AlertStripeInfo className={cls.element('lock-msg-alert')}>
                <Normaltekst>
                    <Tekst id={'lock-msg-infotekst'} />
                </Normaltekst>
            </AlertStripeInfo>
        </div>
    );
};

export default MinsideDropdownLockMsg;
