import React from 'react';
import BEMHelper from '../../../../utils/bem';

interface Props {
    toggleMenu?: () => void;
    isOpen: boolean;
    classname: string;
    ariaLabel: string;
    children: React.ReactNode;
}

export const MenylinjeKnapp = (props: Props) => {
    const { toggleMenu, isOpen, classname, ariaLabel, children } = props;
    const cls = BEMHelper(classname);
    const knappClassname = cls.element('knapp');

    return (
        <button
            onClick={toggleMenu}
            className={`menylinje-knapp ${knappClassname}`}
            id={knappClassname}
            aria-label={ariaLabel}
            aria-pressed={isOpen}
            aria-haspopup="true"
            aria-controls={classname}
            aria-expanded={isOpen}
        >
            <div className={`menylinje-knapp-visning ${cls.element('knapp-visning')}`}>
                {children}
            </div>
        </button>
    );
};

export default MenylinjeKnapp;
