import React, { ReactNode } from 'react';
import BEMHelper from '../../../../utils/bem';
import { Menyknapp } from './meny-knapp/Menyknapp';
import MenyBakgrunn from './meny-bakgrunn/MenyBakgrunn';
import { Language } from '../../../../reducer/language-duck';

type Props = {
    classname: string,
    isOpen: boolean,
    language: Language,
    menyKnappVisning: React.ReactNode,
    toggleFunc: () => void,
    children: ReactNode,
}

export const Ekspanderbarmeny = (props: Props) => {
    const { classname, isOpen, language, menyKnappVisning, toggleFunc, children } = props;
    const cls = BEMHelper(classname);
    const ariaControlsId = cls.element('dropdown-menu');

    return (
        <>
            <Menyknapp
                toggleMenu={toggleFunc}
                clicked={isOpen}
                ariaControlsId={ariaControlsId}
                id={'decorator-meny-toggleknapp'}
            >
                {menyKnappVisning}
            </Menyknapp>
            <div className={cls.element('wrapper')}>
                <div
                    className={cls.element(
                        'innhold-wrapper',
                        isOpen ? 'aktive' : '',
                    )}
                    id={ariaControlsId}
                >
                    <div className={cls.element('innhold')}>
                        {children}
                    </div>
                </div>
                <MenyBakgrunn
                    toggleWindow={toggleFunc}
                    backgroundIsActive={isOpen}
                    className={'desktopmeny'}
                />
            </div>
        </>
    );
};
