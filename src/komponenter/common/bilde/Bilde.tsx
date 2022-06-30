import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';

type Props = { asset: string; altText?: string; className?: string; ariaHidden?: boolean };

export const Bilde = (props: Props) => {
    const { APP_URL } = useSelector((state: AppState) => state.environment);
    return (
        <img
            src={`${APP_URL}${props.asset}`}
            alt={props.altText || ''}
            className={props.className}
            aria-hidden={props.ariaHidden}
        />
    );
};
