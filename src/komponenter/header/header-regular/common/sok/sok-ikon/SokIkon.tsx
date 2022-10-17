import React from 'react';
import 'komponenter/header/header-regular/common/sok/sok-ikon/SokIkon.scss';

export const SokIkon = () => {
    return (
        <svg
            className="menuSearch"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
            focusable="false"
        >
            <circle className="menuSearch__circle" cx="10" cy="10" r="7" />
            <path className="menuSearch__line-1" d="m15 15 7 7" />
            <path className="menuSearch__line-2" d="m15 15 7 7" />
            <path className="menuSearch__line-3" d="m15 15 7 7" />
            <path className="menuSearch__line-4" d="m15 15 7 7" />
        </svg>
    );
};

export default SokIkon;
