import React from 'react';
import BEMHelper from 'utils/bem';
import './HamburgerIkon.less';

type Props = {
    isOpen: boolean;
};

const Linje = ({ className, isOpen }: { className: string; isOpen: boolean }) => (
    <span className={`${className}${isOpen ? ` ${className}--open` : ''}`} />
);

const HamburgerIkon = ({ isOpen }: Props) => {
    const cls = BEMHelper('hamburger-ikon');

    return (
        <span className={`${cls.className}${isOpen ? ` ${cls.className}--open` : ''}`}>
            <Linje className={cls.element('topp')} isOpen={isOpen} />
            <Linje className={cls.element('midt')} isOpen={isOpen} />
            <Linje className={cls.element('bunn')} isOpen={isOpen} />
        </span>
    );
};

export default HamburgerIkon;
