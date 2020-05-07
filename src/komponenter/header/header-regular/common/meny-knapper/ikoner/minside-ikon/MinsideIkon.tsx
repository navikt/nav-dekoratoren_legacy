import React from 'react';
import BEMHelper from 'utils/bem';
import HamburgerIkon from '../hamburger-ikon/HamburgerIkon';
import './MinsideIkon.less';

type Props = {
    hasMenu: boolean;
    isOpen?: boolean;
};

export const MinsideIkon = ({ isOpen = false, hasMenu }: Props) => {
    const cls = BEMHelper('minside-meny-ikon');

    return (
        <div className={cls.element('container')}>
            {hasMenu && <HamburgerIkon isOpen={isOpen} />}
            <div className={cls.element('circle-hode', isOpen ? 'open' : '')} />
            <div
                className={cls.element('circle-kropp', isOpen ? 'open' : '')}
            />
        </div>
    );
};

export default MinsideIkon;
