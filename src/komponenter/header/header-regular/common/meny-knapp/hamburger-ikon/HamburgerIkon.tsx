import React from 'react';
import style from './HamburgerIkon.module.scss';

type Props = {
    isOpen: boolean;
};

const Linje = ({
    className,
    isOpen,
    isOpenClassName,
}: {
    className: string;
    isOpenClassName: string;
    isOpen: boolean;
}) => <span className={`${className} ${isOpen ? isOpenClassName : ''}`} />;

const HamburgerIkon = ({ isOpen }: Props) => {
    return (
        <span className={`${style.hamburgerIkon} hamburger-ikon`}>
            <Linje className={style.topp} isOpenClassName={style.toppOpen} isOpen={isOpen} />
            <Linje className={style.midt} isOpenClassName={style.midtOpen} isOpen={isOpen} />
            <Linje className={style.bunn} isOpenClassName={style.bunnOpen} isOpen={isOpen} />
        </span>
    );
};

export default HamburgerIkon;
