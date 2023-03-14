import React, { SVGProps, useId } from 'react';

const DelSkjerm = (props: SVGProps<SVGSVGElement>) => {
    const id = useId();
    return (
        <svg
            focusable={false}
            aria-hidden="true"
            aria-labelledby={'del-skjerm-ikon' + id}
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            {...props}
        >
            <title id={'del-skjerm-ikon' + id}>Del skjerm ikon</title>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                d="M5 23.5h6m-3-2v2m-7.5-4h15m-7-9V7.7c0-2 1.7-3.7 3.8-3.7H14m-5.5 6.5 2-2m-2 2-2-2M14 4l-1.5-1.5M14 4l-1.5 1.5m0 6H14c.8 0 1.5.7 1.5 1.5v7c0 .8-.7 1.5-1.5 1.5H2c-.8 0-1.5-.7-1.5-1.5v-7c0-.8.7-1.5 1.5-1.5h1.5M13 8.1c.3.3.6.4 1 .4h8c.8 0 1.5-.7 1.5-1.5V2c0-.8-.7-1.5-1.5-1.5h-8m.5 6h9m-7 4h3m-1.5-2v2"
            />
        </svg>
    );
};

export default DelSkjerm;
