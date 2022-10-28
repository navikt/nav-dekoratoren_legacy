import React from 'react';
import 'komponenter/header/header-regular/common/meny-knapp/hamburger-ikon/HamburgerIkon.scss';

const HamburgerIkon = () => {
    return (
        <svg
            className="menuBurger"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
            focusable="false"
        >
            <path className="menuBurger__line-1" d="M2 4h20" />
            <path className="menuBurger__line-2" d="M2 12h20" />
            <path className="menuBurger__line-3" d="M2 20h20" />
        </svg>
    );
};

export default HamburgerIkon;
