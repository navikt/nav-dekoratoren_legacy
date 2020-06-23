import React from 'react';
import BEMHelper from 'utils/bem';
import 'komponenter/header/header-regular/common/meny-knapp/hamburger-ikon/HamburgerIkon.less';

type Props = {
    isOpen: boolean;
};

const Linje = ({
    className,
    isOpen,
}: {
    className: string;
    isOpen: boolean;
}) => <span className={`${className}${isOpen ? ` ${className}--open` : ''}`} />;

const HamburgerIkon = ({ isOpen }: Props) => {
    const cls = BEMHelper('hamburger-ikon');

    return (
        <div
            className={`${cls.className}${
                isOpen ? ` ${cls.className}--open` : ''
            }`}
        >
            <Linje className={cls.element('topp')} isOpen={isOpen} />
            <Linje className={cls.element('midt')} isOpen={isOpen} />
            <Linje className={cls.element('bunn')} isOpen={isOpen} />
        </div>
    );
};

export default HamburgerIkon;
