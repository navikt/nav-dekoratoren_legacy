import React from 'react';
import './MinsideIkon.less'
import BEMHelper from '../../../../../utils/bem';
import HamburgerIkon from '../hamburger-ikon/HamburgerIkon';

type Props = {
    isOpen: boolean;
}

export const MinsideIkon = ({isOpen}: Props) => {
    const cls = BEMHelper('minside-meny-ikon');

    return (
        <div
            className={cls.element('container')}
        >
            <HamburgerIkon isOpen={isOpen}/>
            <div className={cls.element('circle-hode', isOpen ? 'open' : '')} />
            <div className={cls.element('circle-kropp', isOpen ? 'open' : '')} />
        </div>
    );
};

export default MinsideIkon
