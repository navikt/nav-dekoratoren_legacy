import React from 'react';
import BEMHelper from 'utils/bem';
import Tekst from 'tekster/finn-tekst';
import { Button } from '@navikt/ds-react';

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
        <Button
            onClick={props.onClick}
            className={`menylinje-knapp ${cls.element('knapp')}`}
            id={props.id}
            aria-label={props.ariaLabel}
            aria-controls={props.ariaControls}
            aria-expanded={props.isOpen}
            variant="tertiary"
        >
            {props.children}
            {props.tekstId && (
                <span className={`menylinje-knapp__tekst ${cls.element('knapp-tekst')}`}>
                    <Tekst id={props.tekstId} />
                </span>
            )}
        </Button>
    );
};

export default MenylinjeKnapp;
