import React from 'react';
import HamburgerIkon from 'komponenter/header/header-regular/common/meny-knapp/hamburger-ikon/HamburgerIkon';
import BEMHelper from 'utils/bem';
import './MinsideIkon.less';

type Props = {
    hasMenu: boolean;
    isOpen?: boolean;
};

export const MinsideIkon = ({ isOpen = false, hasMenu }: Props) => {
    const cls = BEMHelper('minside-meny-ikon');

    return (
        <div className={cls.className}>
            {hasMenu && <HamburgerIkon isOpen={isOpen} />}
            <div className={cls.element('hode')} />
            <div className={cls.element('kropp')} />
        </div>
    );
};

export default MinsideIkon;
