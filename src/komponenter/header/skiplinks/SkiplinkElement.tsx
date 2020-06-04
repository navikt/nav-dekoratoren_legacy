import React from 'react';
import Tekst from 'tekster/finn-tekst';
import { SkipLink } from 'komponenter/header/skiplinks/Skiplinks';

export const SkipLinkElement = ({
    link,
    className,
}: {
    link: SkipLink;
    className?: string;
}) => (
    <li>
        <a
            href={''}
            className={`skiplink ${className || ''}`}
            onClick={(e) => {
                e.preventDefault();
                if (link.anchorId) {
                    document.getElementById(link.anchorId)?.focus();
                }
                if (link.onClick) {
                    link.onClick();
                }
            }}
        >
            <Tekst id={link.tekstId} />
        </a>
    </li>
);
