import React from 'react';
import { GAEventArgs, triggerGaEvent } from '../utils/google-analytics';

type Props = {
    href: string;
    children: React.ReactNode;
    gaEventArgs?: GAEventArgs;
    className?: string;
    classNameOverride?: string;
    id?: string;
    onClick?: (...args: any) => void;
    tabIndex?: number;
};

export const LenkeMedGA = ({
    href,
    children,
    gaEventArgs,
    className,
    classNameOverride,
    id,
    onClick,
    tabIndex,
}: Props) => (
    <a
        href={href}
        className={classNameOverride || `lenke${className ? ' ' + className : ''}`}
        id={id}
        tabIndex={tabIndex}
        onAuxClick={event =>
            gaEventArgs &&
            event.button &&
            event.button === 1 &&
            triggerGaEvent(gaEventArgs)
        }
        onClick={e => {
            if (onClick) {
                onClick(e);
            }
            if (gaEventArgs) {
                triggerGaEvent(gaEventArgs);
            }
        }}
    >
        {children}
    </a>
);
