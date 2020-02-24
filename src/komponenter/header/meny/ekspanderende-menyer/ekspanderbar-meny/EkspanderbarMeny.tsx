import React, { ReactNode } from 'react';
import BEMHelper from '../../../../../utils/bem';

type Props = {
    isOpen: boolean,
    menyKnapp: React.ReactNode,
    id: string,
    children: ReactNode,
}

const classname = 'dropdown-meny';

export const EkspanderbarMeny = (props: Props) => {
    const { isOpen, menyKnapp, id, children } = props;
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
                    id={id}
                >
                    <div className={cls.element('innhold')}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};
