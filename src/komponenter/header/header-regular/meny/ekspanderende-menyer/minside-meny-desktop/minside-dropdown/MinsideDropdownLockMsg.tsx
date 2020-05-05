import React from 'react';
import BEMHelper from 'utils/bem';
import Lock from 'ikoner/meny/Lock';
import Tekst from '../../../../../../../tekster/finn-tekst';
import { Normaltekst } from 'nav-frontend-typografi';

type Props = {
    classname: string;
};

export const MinsideDropdownLockMsg = (props: Props) => {
    const cls = BEMHelper(props.classname);
    return (
        <div className={cls.element('lock-msg-container')}>
            <Lock height={'18px'} width={'18px'} color={'#000'} />
            <div className={cls.element('lock-msg-text')}>
                <Normaltekst>
                    <Tekst id={'lock-msg'} />
                </Normaltekst>
            </div>
        </div>
    );
};

export default MinsideDropdownLockMsg;
