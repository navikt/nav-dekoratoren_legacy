import React from 'react';
import BEMHelper from 'utils/bem';
import { Flatknapp } from 'nav-frontend-knapper';
import './Menyknapp.less';

interface Props {
    onClick: () => void;
    clicked: boolean;
    classname: string;
    children: React.ReactNode;
}

export const Menyknapp = (props: Props) => {
    const { onClick, clicked, classname, children } = props;
    const cls = BEMHelper(classname);
    const id = cls.element('menyknapp');

    return (
        <>
            <Flatknapp
                onClick={onClick}
                className={`dropdown__menyknapp ${id}`}
                id={id}
                aria-label="Menyknapp"
                aria-haspopup="true"
                aria-controls={cls.element('dropdown-menu')}
                aria-expanded={clicked}
            >
                {children}
            </Flatknapp>
        </>
    );
};

export default Menyknapp;
