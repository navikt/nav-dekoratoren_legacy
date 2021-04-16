import React from 'react';
import Tekst from 'tekster/finn-tekst';

export type SkipLinkProps = {
    tekstId: string;
    anchorId?: string;
    onClick?: () => void;
    className?: string;
};

export const SkipLinkElement = ({ tekstId, anchorId, onClick, className }: SkipLinkProps) => (
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
