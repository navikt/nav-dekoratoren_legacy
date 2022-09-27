import React from 'react';
import style from './SokIkon.module.scss';

type Props = {
    isOpen: boolean;
};

export const SokIkon = ({ isOpen }: Props) => {
    const styleCircleOpen = `${style.circleOpen} sok-ikon__circle--open`;
    const styleLineOpen = `${style.lineOpen} sok-ikon__line--open`;
    const styleLineXOpen = `${style.lineXOpen} sok-ikon__line-x--open`;

    return (
        <span className={`${style.sokIkon} sok-ikon`}>
            <span className={`${style.circle} sok-ikon__circle ${isOpen ? styleCircleOpen : ''}`} />
            <span className={`${style.line} sok-ikon__line ${isOpen ? styleLineOpen : ''}`} />
            <span className={`${style.lineX} sok-ikon__line-x ${isOpen ? styleLineXOpen : ''}`} />
        </span>
    );
};

export default SokIkon;
