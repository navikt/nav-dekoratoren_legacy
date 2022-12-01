import React, { SVGProps, useId } from 'react';

const CollapseUp = (props: SVGProps<SVGSVGElement>) => {
    const id = useId();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            aria-hidden="true"
            aria-labelledby={'collapse-up' + id}
            focusable={false}
            role="img"
            {...props}
        >
            <title id={'collapse-up' + id}>Collapse up icon</title>
            <path d="M9 9H4v1h5V9z" />
            <path d="M7 12V7H6v5h1z" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 3l1-1h7l1 1v7l-1 1h-2v2l-1 1H3l-1-1V6l1-1h2V3zm1 2h4l1 1v4h2V3H6v2zm4 1H3v7h7V6z"
            />
        </svg>
    );
};
export default CollapseUp;
