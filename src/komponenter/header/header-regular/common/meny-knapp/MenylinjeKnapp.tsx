import React from 'react';
import classnames from 'classnames';
import BEMHelper from 'utils/bem';
import Tekst from 'tekster/finn-tekst';
import { Button } from '@navikt/ds-react';
import style from './MenylinjeKnapp.module.scss';

interface Props {
    tekstId?: string;
    onClick: () => void;
    isOpen?: boolean;
    classPrefix: string;
    className?: string;
    ariaControls?: string;
    ariaLabel?: string;
    id?: string;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
}

const MenylinjeKnapp = (props: Props) => {
    const cls = BEMHelper(props.classPrefix);

    return (
        <Button
            onClick={props.onClick}
            className={classnames(props.className, style.menylinjeKnapp, cls.element('knapp'))}
            id={props.id}
            aria-label={props.ariaLabel}
            aria-controls={props.ariaControls}
            aria-expanded={props.isOpen}
            variant="tertiary"
            icon={props.icon}
            disabled={props.disabled}
        >
            {props.children}
            {props.tekstId && (
                <span className={cls.element('knapp-tekst')}>
                    <Tekst id={props.tekstId} />
                </span>
            )}
        </Button>
    );
};

export default MenylinjeKnapp;
