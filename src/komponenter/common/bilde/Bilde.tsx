import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';

type Props = {
    asset: string;
    altText?: string;
    className?: string;
    ariaHidden?: boolean;
    cacheBuster?: string;
};

export const Bilde = ({ asset, altText, className, ariaHidden, cacheBuster }: Props) => {
    const { APP_URL } = useSelector((state: AppState) => state.environment);
    return (
        <img
            src={`${APP_URL}${asset}${cacheBuster ? `?ts=${cacheBuster}` : ''}`}
            alt={altText || ''}
            className={className}
            aria-hidden={ariaHidden}
        />
    );
};
