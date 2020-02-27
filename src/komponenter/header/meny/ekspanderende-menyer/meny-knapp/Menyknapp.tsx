import React from 'react';
import BEMHelper from '../../../../../utils/bem';
import './Menyknapp.less';

interface Props {
    toggleMenu: () => void;
    clicked: boolean;
    classname: string;
    children: React.ReactNode;
}

export const Menyknapp = (props: Props) => {
    const { toggleMenu, clicked, classname, children } = props;
    const cls = BEMHelper(classname);
    const id = cls.element('menyknapp');

    return (
        <button
            onClick={toggleMenu}
            className={`dropdown__menyknapp ${id}`}
            id={id}
            aria-label="Menyknapp"
            aria-haspopup="true"
            aria-controls={cls.element('dropdown-menu')}
            aria-expanded={clicked}
        >
            <div className={'dropdown__menyknapp--innhold'}>{children}</div>
        </button>
    );
};

export default Menyknapp;
