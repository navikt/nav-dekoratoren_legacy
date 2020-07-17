import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
import Logo from './nav-logo.svg'
type Props = {
    altText: string;
}

export const NavLogo = ({ altText }: Props) => {
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    return (
            <img
                alt={altText}
                src={`${XP_BASE_URL}${Logo}`}
            />
    );
}
