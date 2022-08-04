import React from 'react';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import { MenyNode } from 'store/reducers/menu-duck';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { genererUrl } from 'utils/Environment';
import { LinkLoader } from '../../common/content-loaders/LinkLoader';
import { BodyShort } from '@navikt/ds-react';

interface Props {
    node?: MenyNode;
}

const localeSegments: { [locale: string]: string } = { no: 'no', en: 'en', se: 'se' };

// Workaround to get the lang attribute for links to alternative language versions of the site
const getLang = (url: string) => {
    const lastSegment = url.split('/').slice(-1)[0];

    return localeSegments[lastSegment];
};

export const FooterLenker = ({ node }: Props) => {
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);

    if (!node || !node.children) {
        return (
            <li>
                <LinkLoader id={'personvern-loader'} />
            </li>
        );
    }

    return (
        <>
            {node.children.map((lenkeNode) => (
                <li key={lenkeNode.id}>
                    <BodyShort>
                        <LenkeMedSporing
                            href={genererUrl(XP_BASE_URL, lenkeNode.path)}
                            analyticsEventArgs={{
                                category: AnalyticsCategory.Footer,
                                action: `kontakt/${lenkeNode.path}`,
                                label: lenkeNode.displayName,
                            }}
                            lang={getLang(lenkeNode.path)}
                        >
                            {lenkeNode.displayName}
                        </LenkeMedSporing>
                    </BodyShort>
                </li>
            ))}
        </>
    );
};

export default FooterLenker;
