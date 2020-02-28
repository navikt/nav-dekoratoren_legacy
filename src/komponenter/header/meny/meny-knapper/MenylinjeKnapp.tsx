import React from 'react';
import BEMHelper from '../../../../utils/bem';
import './HovedmenyKnapp.less';

interface Props {
    toggleMenu: () => void;
    isOpen: boolean;
    parentClassname: string;
    ariaLabel: string;
    children: React.ReactNode;
}

export const MenylinjeKnapp = (props: Props) => {
    const { toggleMenu, isOpen, parentClassname, ariaLabel, children } = props;
    const cls = BEMHelper(parentClassname);
    const knappClassname = cls.element('knapp');

    return (
        <button
            onClick={toggleMenu}
            className={`menylinje-knapp ${knappClassname}`}
            id={knappClassname}
            aria-label={ariaLabel}
            aria-pressed={isOpen}
            aria-haspopup="true"
            aria-controls={parentClassname}
            aria-expanded={isOpen}
        >
            <div className={`menylinje-knapp-visning ${cls.element('knapp-visning')}`}>
                {children}
            </div>
        </button>
    );
};

export default MenylinjeKnapp;
