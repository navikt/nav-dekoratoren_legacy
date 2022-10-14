import React from 'react';
import { Next } from '@navikt/ds-icons';
import { AnalyticsEventArgs, analyticsEvent } from 'utils/analytics/analytics';
import Lock from 'ikoner/meny/Lock';
import { lukkAlleDropdowns } from 'store/reducers/dropdown-toggle-duck';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import style from './LenkeMedSporing.module.scss';

type Props = {
    href: string;
    children: React.ReactNode;
    analyticsEventArgs?: AnalyticsEventArgs;
    classNameOverride?: string;
    withChevron?: boolean;
    withLock?: boolean;
    closeMenusOnClick?: boolean;
} & React.HTMLAttributes<HTMLAnchorElement>;

export const LenkeMedSporing = ({
    href,
    children,
    analyticsEventArgs,
    className,
    classNameOverride,
    id,
    onClick,
    tabIndex,
    withChevron,
    withLock,
    closeMenusOnClick = true,
    lang,
}: Props) => {
    const dispatch = useDispatch();

    return (
        <a
            href={href}
            className={classNames(
                classNameOverride || style.dekoratorLenke,
                withChevron && style.chevronlenke,
                className
            )}
            id={id}
            tabIndex={tabIndex}
            onAuxClick={(event) =>
                analyticsEventArgs && event.button && event.button === 1 && analyticsEvent(analyticsEventArgs)
            }
            onClick={(event) => {
                if (closeMenusOnClick) {
                    dispatch(lukkAlleDropdowns());
                }
                if (onClick) {
                    onClick(event);
                }
                if (analyticsEventArgs) {
                    analyticsEvent(analyticsEventArgs);
                }
            }}
            lang={lang}
        >
            <>
                {(withLock || withChevron) && (
                    <div className={style.ikonContainer}>
                        {withLock ? (
                            <Lock height={'18px'} width={'18px'} />
                        ) : (
                            withChevron && <Next className={style.chevron} />
                        )}
                    </div>
                )}
                {children}
            </>
        </a>
    );
};
