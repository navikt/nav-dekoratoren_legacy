import React from 'react';
import BEMHelper from '../../../../../utils/bem';
import './MenylinjeKnapp.less';

interface Props {
    toggleMenu?: () => void;
    isOpen: boolean;
    classname: string;
    id?: string;
    ariaLabel: string;
    children: React.ReactNode;
}

export const MenylinjeKnapp = (props: Props) => {
    const { toggleMenu, isOpen, classname, id, ariaLabel, children } = props;
    const cls = BEMHelper(classname);
    const knappClassname = cls.element('knapp');

    return (
        <button
            onClick={toggleMenu}
            className={`menylinje-knapp ${knappClassname}`}
            id={id}
            aria-label={ariaLabel}
            aria-pressed={isOpen}
            aria-haspopup="true"
            aria-controls={classname}
            aria-expanded={isOpen}
        >
            <div
                className={`menylinje-knapp-visning ${cls.element(
                    'knapp-visning'
                )}`}
            >
                {children}
            </div>
        </button>
    );
};

export default MenylinjeKnapp;
