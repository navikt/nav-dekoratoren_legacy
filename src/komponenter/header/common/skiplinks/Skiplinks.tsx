import React, { useEffect, useState } from 'react';
import { SkipLinkElement, SkipLinkProps } from 'komponenter/header/common/skiplinks/SkiplinkElement';
import { logAmplitudeEvent } from '../../../../utils/analytics/amplitude';
import 'komponenter/header/common/skiplinks/Skiplinks.scss';

const mainContentId = 'maincontent';

const Skiplinks = () => {
    const [hasMainContent, setHasMainContent] = useState(false);

    const logSkipLink = (key: string) => {
        logAmplitudeEvent('skiplinks', { kilde: 'header', fritekst: key });
    };

    const skipLinks: SkipLinkProps[] = [
        ...(hasMainContent
            ? [
                  {
                      tekstId: 'skiplinks-ga-til-hovedinnhold',
                      onClick: () => {
                          document.getElementById(mainContentId)?.focus();
                      },
                  },
              ]
            : []),
    ];

    useEffect(() => {
        const mainContentElement = document.getElementById(mainContentId);
        setHasMainContent(!!mainContentElement);
    }, []);

    return skipLinks.length > 0 ? (
        <nav id="site-skiplinks" className="site-skiplinks" aria-label="Hopp til innhold">
            <ul>
                {skipLinks.map((link, index) => (
                    <SkipLinkElement
                        tekstId={link.tekstId}
                        onClick={() => {
                            logSkipLink(link.tekstId);
                            link.onClick && link.onClick();
                        }}
                        className={link.className}
                        key={index}
                    />
                ))}
            </ul>
        </nav>
    ) : null;
};

export default Skiplinks;
