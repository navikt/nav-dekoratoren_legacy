import React, { ReactNode } from 'react';
import BEMHelper from 'utils/bem';
import './EkspanderbarMeny.less';
import SlideToClose from 'komponenter/header/header-regular/mobil/meny/innhold/utils/SlideToClose';

type Props = {
    isOpen: boolean;
    classname: string;
    id: string;
    children: ReactNode;
};

const EkspanderbarMeny = (props: Props) => {
    const { isOpen, classname, id, children } = props;
    const cls = BEMHelper('ekspanderbar');

    return (
        <div className={`${cls.element('container')} ${classname}`}>
            <div
                className={cls.element(
                    'innhold-wrapper',
                    isOpen ? 'active' : ''
                )}
                id={id}
            >
                <div className={cls.element('innhold')}>
                    <SlideToClose>{children}</SlideToClose>
                </div>
            </div>
        </div>
    );
};

export default EkspanderbarMeny;
