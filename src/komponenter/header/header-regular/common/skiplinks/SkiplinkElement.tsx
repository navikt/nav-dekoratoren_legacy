import React from 'react';
import Tekst from 'tekster/finn-tekst';
import { SkipLink } from 'komponenter/header/header-regular/common/skiplinks/Skiplinks';

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
            onClick={(e) => {
                if (!link.anchorId) {
                    e.preventDefault();
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
