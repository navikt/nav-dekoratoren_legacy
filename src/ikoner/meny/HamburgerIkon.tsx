import React from 'react';

const HamburgerIkon = ({ ikonClass }: { ikonClass: string }) => {
    return (
        <svg
            className={ikonClass}
            version="1.1"
            id="Filled_Version"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            enableBackground="new 0 0 24 24"
            xmlSpace="preserve"
        >
            <g>
                <path d="M23.5,1h-23C0.224,1,0,1.225,0,1.5v5C0,6.776,0.224,7,0.5,7h23C23.775,7,24,6.776,24,6.5v-5C24,1.225,23.775,1,23.5,1z" />
                <path
                    d="M23.5,9h-23C0.224,9,0,9.225,0,9.5v5C0,14.776,0.224,15,0.5,15h23c0.275,0,0.5-0.224,0.5-0.5v-5C24,9.225,23.775,9,23.5,9z
		"
                />
                <path
                    d="M23.5,17h-23C0.224,17,0,17.225,0,17.5v5C0,22.776,0.224,23,0.5,23h23c0.275,0,0.5-0.224,0.5-0.5v-5
		            C24,17.225,23.775,17,23.5,17z"
                />
            </g>
        </svg>
    );
};

export default HamburgerIkon;
