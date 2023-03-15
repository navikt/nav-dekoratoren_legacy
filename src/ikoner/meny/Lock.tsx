import React, { useId } from 'react';

type Props = { width?: string; height?: string };

const Lock = ({ width, height }: Props) => {
    const id = useId();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 16 24"
            role="img"
            focusable={false}
            aria-hidden="true"
            aria-labelledby={'lockIcon' + id}
        >
            <title id={'lockIcon' + id} />
            <path
                fill="currentColor"
                stroke="none"
                d="M8 0a5 5 0 0 1 5 5v3h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V10c0-1.1.9-2 2-2h1V5a5 5 0 0 1 5-5Zm6 10H2v12h12V10Zm-6 3a2 2 0 0 1 1 3.7V20H7v-3.3A2 2 0 0 1 8 13ZM8 2a3 3 0 0 0-3 2.8V8h6V5a3 3 0 0 0-2.8-3H8Z"
            />
        </svg>
    );
};

export default Lock;
