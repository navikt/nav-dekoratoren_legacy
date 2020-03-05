import React from 'react';
import './MinsideIkon.less'
import BEMHelper from '../../../../../../../utils/bem';
import HamburgerIkon from '../../ikoner/hamburger-ikon/HamburgerIkon';

type Props = {
    hasMenu: boolean;
    isOpen?: boolean;
}

export const MinsideIkon = ({isOpen= false, hasMenu}: Props) => {
    const cls = BEMHelper('minside-meny-ikon');

    return (
        <div
            className={cls.element('container')}
        >
            {hasMenu && <HamburgerIkon isOpen={isOpen}/>}
            <div className={cls.element('circle-hode', isOpen ? 'open' : '')} />
            <div className={cls.element('circle-kropp', isOpen ? 'open' : '')} />
        </div>
    );
};

export default MinsideIkon
