import React from 'react';
import BEMHelper from 'utils/bem';
import './MenylinjeKnapp.less';

interface Props {
    isOpen: boolean;
    classname: string;
    onClick: () => void;
    ariaControls: string;
    ariaLabel?: string;
    id?: string;
    children: React.ReactNode;
}

const MenylinjeKnapp = (props: Props) => {
    const cls = BEMHelper(props.classname);

    return (
        <button
            onClick={props.onClick}
            className={`menylinje-knapp ${cls.element('knapp')}`}
            id={props.id}
            aria-label={props.ariaLabel}
            aria-controls={props.ariaControls}
            aria-expanded={props.isOpen}
        >
            <div
                className={`menylinje-knapp-visning ${cls.element(
                    'knapp-visning'
                )}`}
            >
                {props.children}
            </div>
        </button>
    );
};

export default MenylinjeKnapp;
