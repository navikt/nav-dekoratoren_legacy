import React from 'react';
import Tekst from 'tekster/finn-tekst';

type Props = {
    tekstId: string;
    className?: string;
    anchorId?: string;
    onClick?: () => void;
};

export const SkipLinkElement = ({
    tekstId,
    className,
    anchorId,
    onClick,
}: Props) => (
    <li>
        <a
            href={`#${anchorId || ''}`}
            className={`skiplink ${className || ''}`}
            onClick={(e) => {
                if (!anchorId) {
                    e.preventDefault();
                }
                if (onClick) {
                    onClick();
                }
            }}
        >
            <Tekst id={tekstId} />
        </a>
    </li>
);
