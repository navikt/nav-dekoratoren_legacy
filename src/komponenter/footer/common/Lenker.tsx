import React, { Fragment } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import { MenyNode } from 'store/reducers/menu-duck';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { genererUrl } from 'utils/Environment';
import { LinkLoader } from '../../common/content-loaders/LinkLoader';

interface Props {
    node?: MenyNode;
}

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
        <Fragment>
            {node.children.map((lenkeNode) => (
                <li key={lenkeNode.id}>
                    <Normaltekst>
                        <LenkeMedSporing
                            href={genererUrl(XP_BASE_URL, lenkeNode.path)}
                            analyticsEventArgs={{
                                category: AnalyticsCategory.Footer,
                                action: `kontakt/${lenkeNode.path}`,
                                label: lenkeNode.displayName,
                            }}
                        >
                            {lenkeNode.displayName}
                        </LenkeMedSporing>
                    </Normaltekst>
                </li>
            ))}
        </Fragment>
    );
};

export default FooterLenker;
