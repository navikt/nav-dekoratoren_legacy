import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { erDev } from 'utils/Environment';

type Props = { asset: string; altText?: string; className?: string };

export const Bilde = (props: Props) => {
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    return (
        <img
            src={`${erDev ? document.location.origin : XP_BASE_URL}${
                props.asset
            }`}
            alt={props.altText}
            className={props.className}
        />
    );
};
