import React, { SVGProps } from 'react';

const PilOppHvit = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            focusable={false}
            width="18px"
            height="18px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="m17.7 5.3-5-5a1 1 0 0 0-1.4 0l-5 5a1 1 0 1 0 1.4 1.4L11 3.42V23a1 1 0 1 0 2 0V3.4l3.3 3.3a1 1 0 0 0 1.4 0 1 1 0 0 0 0-1.42z" />
        </svg>
    );
};

export default PilOppHvit;
