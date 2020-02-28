import React from 'react';
import BEMHelper from '../../../../../utils/bem';
import './Menyknapp.less';
import { Knapp } from 'nav-frontend-knapper';

interface Props {
    toggleMenu: () => void;
    clicked: boolean;
    classname: string;
    children: React.ReactNode;
}

export const Menyknapp = (props: Props) => {
    const { toggleMenu, clicked, classname, children } = props;
    const cls = BEMHelper(classname);

    return (
        <>
            <Knapp
                onClick={toggleMenu}
                className={`dropdown__menyknapp ${cls.element('menyknapp')}`}
                id={cls.element('decorator-meny-toggleknapp')}
                aria-label="Menyknapp"
                aria-haspopup="true"
                aria-controls={cls.element('dropdown-menu')}
                aria-expanded={clicked}
            >
                {children}
            </Knapp>
        </>
    );
};

export default Menyknapp;
