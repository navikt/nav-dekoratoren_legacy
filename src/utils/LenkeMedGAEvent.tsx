import React from 'react';
import { GAEventArgs, triggerGaEvent } from './google-analytics';

type Props = {
    href: string,
    children: React.ReactNode,
    gaEventArgs?: GAEventArgs,
    className?: string,
    id?: string,
    onClick?: (...args: any) => void,
    tabIndex?: number,
}

const LenkeMedGAEvent = ({
                             href,
                             children,
                             gaEventArgs,
                             className,
                             id,
                             onClick,
                             tabIndex}: Props) => {
    const gaEventFunc = gaEventArgs && (() => {
        triggerGaEvent(gaEventArgs);
    });

    return (
        <a
            href={href}
            className={className}
            id={id}
            tabIndex={tabIndex}
            onAuxClick={gaEventFunc}
            onClick={(e) => {
                if (onClick) {
                    onClick(e);
                }
                if (gaEventFunc) {
                    gaEventFunc();
                }
            }}
        >
            {children}
        </a>
    );
};

export default LenkeMedGAEvent;
