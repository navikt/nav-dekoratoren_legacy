import React from 'react';

type Props = {
    altText: string;
};

export const NavLogo = ({ altText }: Props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 269 169">
        <title>{altText}</title>
        <defs>
            <path id="a" d="M22 43V1H1v42h21z" />
        </defs>
        <g fill="none" fillRule="evenodd">
            <path
                fill="#C30000"
                d="M125 169a84 84 0 110-169 84 84 0 010 169zM0 121l17-42h17l-17 42zM213 121l17-42h9l-17 42z"
                className="nav-logo-fill"
            />
            <g transform="translate(246 78)">
                <mask id="b" fill="#fff">
                    <use href="#a" />
                </mask>
                <path
                    fill="#C30000"
                    d="M1 43L18 1h4L5 43z"
                    className="nav-logo-fill"
                    mask="url(#b)"
                />
            </g>
            <path
                fill="#FEFEFE"
                d="M197 79h-15l-1 1-8 25-9-25-1-1h-29l-1 1v8c0-6-7-9-12-9-9 0-16 6-18 16 0-7 0-9-2-11l-3-3c-3-2-5-2-10-2h-6l-1 1-5 13V80l-1-1H61l-1 1-6 13 1 1h5v26l1 1h14l1-1V94h5l5 1 1 1 1 8v16l1 1h13l2-1 3-7c4 5 10 8 17 8h2l2-1 5-12v12l1 1h13l2-1 5-13-1-1h-5V84l15 36 2 1h15l2-1 16-40c1-1-1-1-1-1zm-64 27h-9a6 6 0 110-13h3c3 0 6 3 6 7v6z"
            />
        </g>
    </svg>
);
