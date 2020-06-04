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
            href={`#${link.anchorId || ''}`}
            className={`skiplink ${className || ''}`}
            onClick={link.onClick}
        >
            <Tekst id={link.tekstId} />
        </a>
    </li>
);
