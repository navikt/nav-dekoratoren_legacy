import React from 'react';
import BEMHelper from '../../utils/bem';
import './HeaderSimple.less';
import NavLogoRod from '../../ikoner/meny/NavLogoRod';

const cls = BEMHelper('simple-header');

export const SimpleHeader = () => {
    return (
        <div className={cls.className}>
            <div className={cls.element('content')}>
                <NavLogoRod
                    width="88"
                    height="88"
                    classname={cls.element('logo')}
                />
            </div>
        </div>
    );
};
