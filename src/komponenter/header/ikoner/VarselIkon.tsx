import React from 'react';

const VarselIkon = ({ ikonClass }: { ikonClass: string }) => {
    return (
        <svg
            className={ikonClass}
            version="1.1"
            id="Filled_Version"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="24px"
            height="24px"
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
        /* <svg
            className={ikonClass}
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 33.76 32.82"
        >
            <defs>
                <style>
                    .cls-1 {
                    fill: #0067c5;
                }

                    .cls-2 {
                    fill: #c30000;
                }

                    .cls-3 {
                    fill: #fff;
                }
                </style>
            </defs>
            <title>varsler styleguide 210416</title>
            <g>
                <path className="cls-1"
                      d="M18.37,27.48H11a0.64,0.64,0,0,0-.61.67,4.49,4.49,0,0,0,4.28,4.67A4.49,4.49,0,0,0,19,28.15,0.64,0.64,0,0,0,18.37,27.48Z"/>
                <path className="cls-1"
                      d="M25.64,17.73H25.27A9.36,9.36,0,0,1,18,2.51h0A4,4,0,0,0,14.75.82a4.42,4.42,0,0,0-4.18,3.56,12.07,12.07,0,0,0-6.81,
                      11.1v6A3.35,3.35,0,0,1,.67,24.95a0.91,0.91,0,0,0-.67.87,1.08,1.08,0,0,0,.64,1H28.75a1,1,0,0,0,.61-1A0.78,0.78,0,0,0,
                      28.78,25a3.35,3.35,0,0,1-3-3.51V17.71Z"/>
                <path className="cls-2"
                      d="M25.36,0a8.45,8.45,0,0,0-6.79,3.44h0v0A8.38,8.38,0,0,0,25.4,16.73c0.13,0,.49,0,0.49,0a8.6,8.6,0,0,0,7.87-8.35A8.41,
                      8.41,0,0,0,25.36,0Z"/>
                <circle className="cls-3" cx="25.31" cy="8.37" r="2"/>
            </g>
        </svg>
        */
    );
};

export default VarselIkon;
