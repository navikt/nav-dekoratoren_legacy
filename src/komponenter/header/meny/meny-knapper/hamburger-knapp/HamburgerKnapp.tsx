import React from 'react';
import './HamburgerKnapp.less';
import BEMHelper from '../../../../../utils/bem';

type Props = {
    isOpen: boolean;
    className?: string;
};

const Linje = ({
    className,
    isOpen,
}: {
    className: string;
    isOpen: boolean;
}) => <span className={`${className}${isOpen ? ` ${className}--open` : ''}`} />;

const HamburgerKnapp = ({ isOpen, className }: Props) => {
    const cls = BEMHelper('hamburger-knapp');

    return (
        <div
            className={`${cls.element('container')}${
                className ? ` ${className}` : ''
            }`}
        >
            <Linje className={cls.element('topp')} isOpen={isOpen} />
            <Linje className={cls.element('midt')} isOpen={isOpen} />
            <Linje className={cls.element('bunn')} isOpen={isOpen} />
        </div>
    );
};

export default HamburgerKnapp;
