import React from 'react';
import BEMHelper from '../../../../../utils/bem';
import './Menyknapp.less';

interface Props {
    toggleMenu: () => void;
    clicked: boolean;
    classname: string;
    ariaControlsId: string;
    children: React.ReactNode;
}

export const Menyknapp = (props: Props) => {
    const { toggleMenu, clicked, classname, ariaControlsId, children } = props;
    const cls = BEMHelper(classname);
    const id = cls.element('menyknapp');

    return (
        <button
            onClick={toggleMenu}
            className={`dropdown__menyknapp ${id}`}
            id={id}
            aria-label="Menyknapp"
            aria-haspopup="true"
            aria-controls={ariaControlsId}
            aria-expanded={clicked}
        >
            <div className={'dropdown__menyknapp-visning'}>{children}</div>
        </button>
    );
};

export default Menyknapp;
