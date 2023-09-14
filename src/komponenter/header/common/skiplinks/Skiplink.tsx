import React, {useEffect, useState} from 'react';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { AnalyticsEventArgs, AnalyticsCategory } from 'utils/analytics/analytics';
import Tekst from 'tekster/finn-tekst';

import style from './Skiplink.module.scss';

const mainContentId = 'maincontent';
const mainContentHref = `#${mainContentId}`;
const skiplinkTextId = 'skiplink-text';

const Skiplink = () => {
    const [hasMainContent, setHasMainContent] = useState(false);
    const linkTextId = 'skiplinks-ga-til-hovedinnhold';
    const anlyticsProps:AnalyticsEventArgs = {
        category: AnalyticsCategory.Header,
        eventName: 'skiplinks',
        action: linkTextId,
        destination: mainContentHref,
    }

    useEffect(() => {
        const mainContentElement = document.getElementById(mainContentId);
        setHasMainContent(!!mainContentElement);
    }, []);

    return hasMainContent ? (
        <nav aria-labelledby={skiplinkTextId}>
            <LenkeMedSporing
                href={mainContentHref}
                className={style.skiplink}
                analyticsEventArgs={anlyticsProps}
            >
                <span id={skiplinkTextId}>
                    <Tekst id={linkTextId} />
                </span>
            </LenkeMedSporing>
        </nav>
    ) : null;
};

export default Skiplink;
