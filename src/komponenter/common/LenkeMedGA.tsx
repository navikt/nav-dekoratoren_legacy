import React from 'react';
import { GAEventArgs, gaEvent } from 'utils/google-analytics';
import { HoyreChevron } from 'nav-frontend-chevron';

type Props = {
    href: string;
    children: React.ReactNode;
    gaEventArgs?: GAEventArgs;
    className?: string;
    classNameOverride?: string;
    id?: string;
    onClick?: (...args: any) => void;
    tabIndex?: number;
    withChevron?: boolean;
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
    withChevron,
}: Props) => (
    <a
        href={href}
        className={
            classNameOverride ||
            `${withChevron ? 'chevronlenke' : 'lenke'}${
                className ? ' ' + className : ''
            }`
        }
        id={id}
        tabIndex={tabIndex}
        onAuxClick={(event: React.MouseEvent) =>
            gaEventArgs &&
            event.button &&
            event.button === 1 &&
            gaEvent(gaEventArgs)
        }
        onClick={(event: React.MouseEvent) => {
            if (onClick) {
                onClick(event);
            }
            if (gaEventArgs) {
                gaEvent(gaEventArgs);
            }
        }}
    >
        <>
            {withChevron && (
                <div>
                    <HoyreChevron className={'chevronlenke__chevron'} />
                </div>
            )}
            {children}
        </>
    </a>
);
