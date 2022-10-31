import React, { useId } from 'react';

export const LoggutIkonMobil = () => {
    const id = useId();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="24"
            viewBox="0 0 22 24"
            aria-hidden="true"
            focusable="false"
            aria-labelledby={'logg-ut-ikon' + id}
            role="img"
        >
            <title id={'logg-ut-ikon' + id}>Logg ut ikon</title>
            <path
                fill="currentColor"
                d="M2 0a2 2 0 0 0-2 2v20c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2v-3h-2v3H2V2h10v3h2V2a2 2 0 0 0-2-2H2Zm14.4 6 5.6 6-5.6 6-1.4-1.5 3.3-3.5H5v-2h13.3L15 7.5 16.4 6Z"
            />
        </svg>
    );
};
