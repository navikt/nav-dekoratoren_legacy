import React from 'react';
export default ({
    width,
    height,
    color,
}: {
    width?: string;
    height?: string;
    color?: string;
}) => (
    <svg width={width} height={height} viewBox="0 0 16 24" version="1.1">
        <g
            id="V1-Design"
            stroke="none"
            strokeWidth="1"
            fill={color || '#0067C5'}
            fillRule="evenodd"
        >
            <g
                id="Artboard-Copy"
                transform="translate(-388.000000, -225.000000)"
                fill={color || '#0067C5'}
            >
                <g
                    id="New-icons-2px/24px/locked-Copy-5"
                    transform="translate(388.000000, 225.000000)"
                >
                    <path
                        d="M8,0 C10.7614237,0 13,2.23857625 13,5 L13,8 L14,8 C15.1045695,8 16,8.8954305 16,10 L16,22 C16,23.1045695 15.1045695,24 14,24 L2,24 C0.8954305,24 0,23.1045695 0,22 L0,10 C0,8.8954305 0.8954305,8 2,8 L3,8 L3,5 C3,2.23857625 5.23857625,0 8,0 Z M14,10 L2,10 L2,22 L14,22 L14,10 Z M8,13 C9.1045695,13 10,13.8954305 10,15 C10,15.7398375 9.59828461,16.3858493 9.0010775,16.7318119 L9,20 L7,20 L6.99992752,16.7323937 C6.40216612,16.3865739 6,15.7402524 6,15 C6,13.8954305 6.8954305,13 8,13 Z M8,2 C6.40231912,2 5.09633912,3.24891996 5.00509269,4.82372721 L5,5 L5,8 L11,8 L11,5 C11,3.40231912 9.75108004,2.09633912 8.17627279,2.00509269 L8,2 Z"
                        id="Shape"
                    />
                </g>
            </g>
        </g>
    </svg>
);
