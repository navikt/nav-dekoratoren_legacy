import React from 'react';
import BEMHelper from 'utils/bem';
import Tekst from 'tekster/finn-tekst';
import './MenylinjeKnapp.less';

interface Props {
    tekstId?: string;
    onClick: () => void;
    isOpen: boolean;
    classname: string;
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
            {props.children}
            {props.tekstId && (
                <span className={`menylinje-knapp__tekst ${cls.element('knapp-tekst')}`}>
                    <Tekst id={props.tekstId} />
                </span>
            )}
        </button>
    );
};

export default MenylinjeKnapp;
