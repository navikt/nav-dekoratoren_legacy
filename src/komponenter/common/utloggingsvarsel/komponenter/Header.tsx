import React from 'react';
import Veilederen from '../../../../ikoner/varsler/Veiledervarsel';
import BEMHelper from '../../../../utils/bem';

const cls = BEMHelper('utloggingsvarsel');

const Header = () => (
    <div className={cls.element('modal--headwrapper')}>
        <div className={cls.element('modal--headcontainer')}>
            <div className={cls.element('modal--ikon')}>
                <Veilederen width="5rem" height="4.5rem" />
            </div>
        </div>
    </div>
);
export default Header;
