import React, { useId } from 'react';
import 'komponenter/header/header-regular/common/sok/sok-ikon/SokIkon.scss';

export const SokIkon = () => {
    const id = useId();
    return (
        <svg
            className="menuSearch"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
            focusable="false"
            aria-labelledby={'menuSearch_' + id}
            role="img"
        >
            <title id={'menuSearch_' + id}>Søke-ikon</title>
            <circle className="menuSearch__circle" cx="10" cy="10" r="7" />
            <path className="menuSearch__line-1" d="m15 15 7 7" />
            <path className="menuSearch__line-2" d="m15 15 7 7" />
            <path className="menuSearch__line-3" d="m15 15 7 7" />
            <path className="menuSearch__line-4" d="m15 15 7 7" />
        </svg>
    );
};

export default SokIkon;
