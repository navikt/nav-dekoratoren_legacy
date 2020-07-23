import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { erDev } from 'utils/Environment';

type Props = {
    src: string;
    alt?: string;
    className?: string;
};

export const Bilde = ({ src, alt, className }: Props) => {
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    return (
        <img
            alt={alt || ''}
            src={`${erDev ? 'http://localhost:8088' : XP_BASE_URL}${src}`} // TODO: ikke gjør dette
            className={className}
        />
    );
};
