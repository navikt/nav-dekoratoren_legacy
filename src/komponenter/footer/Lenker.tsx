import React, { Fragment } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { LenkeMedGA } from 'komponenter/common/LenkeMedGA';
import { GACategory } from 'utils/google-analytics';
import { MenyNode } from 'store/reducers/menu-duck';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { genererUrl } from 'utils/Environment';

interface Props {
    node?: MenyNode;
}

export const FooterLenker = ({ node }: Props) => {
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);

    if (!node || !node.children) {
        return null;
    }

    return (
        <Fragment>
            {node.children.map((lenkeNode) => (
                <li key={lenkeNode.id}>
                    <Normaltekst>
                        <LenkeMedGA
                            href={genererUrl(XP_BASE_URL, lenkeNode.path)}
                            gaEventArgs={{
                                category: GACategory.Footer,
                                action: `kontakt/${lenkeNode.path}`,
                                label: lenkeNode.displayName,
                            }}
                        >
                            {lenkeNode.displayName}
                        </LenkeMedGA>
                    </Normaltekst>
                </li>
            ))}
        </Fragment>
    );
};

export default FooterLenker;
