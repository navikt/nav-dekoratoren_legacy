import React, { ReactNode } from 'react';
import BEMHelper from '../../../../../utils/bem';
import './EkspanderbarMeny.less';

type Props = {
    isOpen: boolean;
    menyKnapp: React.ReactNode;
    classname: string;
    id: string;
    children: ReactNode;
};

export const EkspanderbarMeny = (props: Props) => {
    const { isOpen, menyKnapp, classname, id, children } = props;
    const cls = BEMHelper(`ekspanderbar ${classname}`);

    return (
        <>
            {menyKnapp}
            <div className={cls.element('container')}>
                <div
                    className={cls.element(
                        'innhold-wrapper',
                        isOpen ? 'aktive' : ''
                    )}
                    id={id}
                >
                    <div className={cls.element('innhold')}>{children}</div>
                </div>
            </div>
        </>
    );
};
