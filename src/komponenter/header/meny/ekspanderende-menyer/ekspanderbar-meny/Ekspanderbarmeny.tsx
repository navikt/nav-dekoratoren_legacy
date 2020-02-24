import React, { ReactNode } from 'react';
import BEMHelper from '../../../../../utils/bem';

type Props = {
    classname: string,
    isOpen: boolean,
    menyKnapp: React.ReactNode,
    children: ReactNode,
}

export const Ekspanderbarmeny = (props: Props) => {
    const { classname, isOpen, menyKnapp, children } = props;
    const cls = BEMHelper(classname);

    return (
        <>
            {menyKnapp}
            <div className={'dropdown-container'}>
                <div
                    className={cls.element(
                        'innhold-wrapper',
                        isOpen ? 'aktive' : '',
                    )}
                    id={'dropdown-menu'}
                >
                    <div className={cls.element('innhold')}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};
