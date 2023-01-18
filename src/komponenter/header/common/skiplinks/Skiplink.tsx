import React, { useEffect, useState } from 'react';
import { logAmplitudeEvent } from 'utils/analytics/amplitude';
import Tekst from 'tekster/finn-tekst';

import style from './Skiplink.module.scss';

const mainContentId = 'maincontent';

const Skiplink = () => {
    const [hasMainContent, setHasMainContent] = useState(false);
    const linkTextId = 'skiplinks-ga-til-hovedinnhold';

    useEffect(() => {
        const mainContentElement = document.getElementById(mainContentId);
        setHasMainContent(!!mainContentElement);
    }, []);

    return hasMainContent ? (
        <nav aria-label="Hopp til innhold">
            <button
                className={style.skiplink}
                onClick={() => {
                    logAmplitudeEvent('skiplinks', { kilde: 'header', fritekst: linkTextId });
                    document.getElementById(mainContentId)?.focus();
                }}
            >
                <Tekst id={linkTextId} />
            </button>
        </nav>
    ) : null;
};

export default Skiplink;
