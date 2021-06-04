import React, { SVGProps } from 'react';

const Clock = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 4.063V0H1v8h8V6H4c1.825-2.43 4.73-4 8-4 5.523 0 10 4.477 10 10 0 2.411-.852 4.62-2.272 6.347l1.544 1.27A11.954 11.954 0 0024 12c0-6.627-5.373-12-12-12a11.972 11.972 0 00-9 4.063zM16.375 16.78L11 12.48V6h2v5.52l4.625 3.7-1.25 1.56zM0 11v2h2v-2H0zm1 7v-2h2v2H1zm4 4h2v-2H5v2zm8 2h-2v-2h2v2zm4-2h2v-2h-2v2z"
            fill="currentColor"
        />
    </svg>
);
export default Clock;
