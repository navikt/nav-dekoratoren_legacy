import React from 'react';
import style from './SokIkon.module.scss';

type Props = {
    isOpen: boolean;
};

export const SokIkon = ({ isOpen }: Props) => {
    return (
        <span className={style.sokIkon}>
            <span className={`${style.circle} ${isOpen ? style.circleOpen : ''}`} />
            <span className={`${style.line} ${isOpen ? style.lineOpen : ''}`} />
            <span className={`${style.lineX} ${isOpen ? style.lineXOpen : ''}`} />
        </span>
    );
};

export default SokIkon;
