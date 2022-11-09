import React, { SVGProps, useId } from 'react';

const PilOppHvit = (props: SVGProps<SVGSVGElement>) => {
    const id = useId();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            aria-hidden="true"
            aria-labelledby={'PilOppHvit' + id}
            focusable={false}
            role="img"
            {...props}
        >
            <title id={'PilOppHvit' + id}>Pil opp ikon</title>
            <path d="m17.7 5.3-5-5a1 1 0 0 0-1.4 0l-5 5a1 1 0 1 0 1.4 1.4L11 3.42V23a1 1 0 1 0 2 0V3.4l3.3 3.3a1 1 0 0 0 1.4 0 1 1 0 0 0 0-1.42z" />
        </svg>
    );
};

export default PilOppHvit;
