import React from 'react';
import Tekst from 'tekster/finn-tekst';

export type SkipLinkProps = {
    tekstId: string;
    onClick: () => void;
    className?: string;
};

export const SkipLinkElement = ({ tekstId, onClick, className }: SkipLinkProps) => (
    <li>
        <a
            href={'/'}
            className={`skiplink ${className || ''}`}
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
        >
            <Tekst id={tekstId} />
        </a>
    </li>
);
