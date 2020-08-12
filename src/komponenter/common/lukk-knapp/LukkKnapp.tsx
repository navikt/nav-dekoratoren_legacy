import React from 'react';
import BEMHelper from 'utils/bem';
import './LukkKnapp.less';

type Props = {
    onClick: () => void;
    className?: string;
    ariaLabel?: string;
};

export const LukkKnapp = ({ onClick, className, ariaLabel }: Props) => {
    const cls = BEMHelper('lukk-knapp');

    return (
        <button
            className={`${cls.className}${className ? ` ${className}` : ''}`}
            onClick={onClick}
            aria-label={ariaLabel}
        >
            <div className={cls.element('ikon-1')} />
            <div className={cls.element('ikon-2')} />
        </button>
    );
};
