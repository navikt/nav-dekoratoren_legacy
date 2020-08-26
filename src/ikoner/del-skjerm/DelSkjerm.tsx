import React, { SVGProps } from 'react';

const DelSkjerm = (props: SVGProps<SVGSVGElement>) => (
    <svg
        focusable={false}
        viewBox="0 0 24 24"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        {...props}
    >
        <g fill="none" strokeMiterlimit="10" strokeLinejoin="round">
            <path strokeLinecap="round" d="M5 23.5h6M8 21.5v1.98" />
            <path d="M.5 19.5h15" />
            <path
                strokeLinecap="round"
                d="M8.5 10.5v-2.75c0-2.071 1.678-3.75 3.75-3.75h1.75M10.5 8.5l-2 2-2-2M12.5 11.5h1.5c.828 0 1.5.671 1.5 1.5v7c0 .828-.672 1.5-1.5 1.5h-12c-.83 0-1.5-.672-1.5-1.5v-7c0-.829.67-1.5 1.5-1.5h1.5M13.001 8.119c.265.237.615.381.999.381h8c.828 0 1.5-.672 1.5-1.5v-5c0-.829-.672-1.5-1.5-1.5h-8M14.5 6.5h9M16.5 10.5h3M18 8.5v2M12.5 2.5l1.5 1.5-1.5 1.5"
            />
        </g>
    </svg>
);

export default DelSkjerm;
