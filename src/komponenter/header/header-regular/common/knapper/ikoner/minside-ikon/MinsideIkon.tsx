import React from 'react';
import HamburgerIkon from '../hamburger-ikon/HamburgerIkon';
import HodeKroppIkon from '../hode-kropp-ikon/HodeKroppIkon';
import './MinsideIkon.less';

type Props = {
    hasMenu: boolean;
    isOpen?: boolean;
};

export const MinsideIkon = ({ isOpen = false, hasMenu }: Props) => {
    return (
        <div className={'minside-meny-ikon'}>
            {hasMenu && <HamburgerIkon isOpen={isOpen} />}
            <HodeKroppIkon isOpen={isOpen} />
        </div>
    );
};

export default MinsideIkon;
