import React from 'react';

const SokIkon = ({
    width,
    height,
    color,
}: {
    width?: string;
    height?: string;
    color?: string;
}) => {
    return (
        <svg
            width={width ? width : '20px'}
            height={height ? height : '21px'}
            viewBox="0 -1 21 22"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <title>soke felt knapp</title>
            <desc>forstorrelsesglass ikon</desc>
            <defs>
                <path
                    d="M7.78235294,-7.44293516e-13 C12.0738882,-7.44293516e-13 15.5647059,3.49081765 15.5647059,7.78235294 C15.5647059,9.60774706 14.9282824,11.2870059 13.8707471,12.6143294 L13.8707471,12.6143294 L20.5013118,19.2786176 C20.8376824,19.6167176 20.8376824,20.1632118 20.4978529,20.5013118 C20.1580235,20.8394118 19.6115294,20.8376824 19.2751588,20.4978529 L19.2751588,20.4978529 L12.6532412,13.8422118 C11.319,14.9161765 9.62504118,15.5647059 7.78235294,15.5647059 C3.49081765,15.5647059 -1.77635684e-14,12.0738882 -1.77635684e-14,7.78235294 C-1.77635684e-14,3.49081765 3.49081765,-7.44293516e-13 7.78235294,-7.44293516e-13 Z M7.78235294,1.72941176 C4.44372353,1.72941176 1.72941176,4.44372353 1.72941176,7.78235294 C1.72941176,11.1192529 4.44372353,13.8352941 7.78235294,13.8352941 C11.1192529,13.8352941 13.8352941,11.1192529 13.8352941,7.78235294 C13.8352941,4.44372353 11.1192529,1.72941176 7.78235294,1.72941176 Z"
                    id="Sok-ikon-path01"
                />
            </defs>
            <g
                id="Sok-ikon-path02"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
            >
                <g
                    id="Sok-ikon-path07"
                    transform="translate(-189.000000, -20.000000)"
                >
                    <g
                        id="Sok-ikon-path03"
                        transform="translate(189.000000, 20.500000)"
                    >
                        <g id="Sok-ikon-path04">
                            <mask id="Sok-ikon-path05" fill="white">
                                <use xlinkHref="#Sok-ikon-path01" />
                            </mask>
                            <use
                                id="Sok-ikon-path06"
                                fill={color ? color : '#3E3832'}
                                xlinkHref="#Sok-ikon-path01"
                            />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default SokIkon;
