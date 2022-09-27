import React, { ReactNode } from 'react';
import style from './EkspanderbarMeny.module.scss';

type Props = {
    isOpen: boolean;
    classname: string;
    id: string;
    children: ReactNode;
};

const EkspanderbarMeny = (props: Props) => {
    const { isOpen, classname, id, children } = props;

    const styleActive = `${style.active} ekspanderbar__innhold-wrapper--active`;

    return (
        <div className={`${style.container} ${classname}`}>
            <div
                className={`${style.innholdWrapper} ekspanderbar__innhold-wrapper ${isOpen ? styleActive : ''}`}
                id={id}
            >
                <div className={style.innhold}>{children}</div>
            </div>
        </div>
    );
};

export default EkspanderbarMeny;
