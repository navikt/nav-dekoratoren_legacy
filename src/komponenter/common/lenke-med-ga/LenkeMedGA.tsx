import React from 'react';
import { GAEventArgs, gaEvent } from 'utils/google-analytics';
import { HoyreChevron } from 'nav-frontend-chevron';
import Lock from 'ikoner/meny/Lock';
import './LenkeMedGA.less';

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
    withLock?: boolean;
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
    withLock,
}: Props) => {
    const classnameFull = `${classNameOverride || 'lenke dekorator-lenke'}${
        withChevron ? ' chevronlenke' : ''
    }${className ? ` ${className}` : ''}`;

    return (
        <a
            href={href}
            className={classnameFull}
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
                {(withLock || withChevron) && (
                    <div className={'dekorator-lenke__ikon-container'}>
                        {withLock ? (
                            <Lock height={'18px'} width={'18px'} />
                        ) : (
                            withChevron && (
                                <HoyreChevron
                                    className={'chevronlenke__chevron'}
                                />
                            )
                        )}
                    </div>
                )}
                {children}
            </>
        </a>
    );
};
