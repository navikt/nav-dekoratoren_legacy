import React, { ReactNode } from 'react';
import style from './EkspanderbarMeny.module.scss';
import classNames from 'classnames';

type Props = {
    isOpen: boolean;
    classname: string;
    classnameInnhold?: string;
    id: string;
    children: ReactNode;
};

const EkspanderbarMeny = (props: Props) => {
    const { isOpen, classname, id, children, classnameInnhold } = props;

    const styleActive = `${style.active} ekspanderbar__innhold-wrapper--active`;

    return (
        <div className={`${style.container} ${classname}`}>
            <div
                className={`${style.innholdWrapper} ekspanderbar__innhold-wrapper ${isOpen ? styleActive : ''}`}
                id={id}
            >
                <div className={classNames(style.innhold, classnameInnhold)}>{children}</div>
            </div>
        </div>
    );
};

export default EkspanderbarMeny;
