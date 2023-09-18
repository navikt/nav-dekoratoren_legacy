import React from 'react';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import { MenyNode } from 'store/reducers/menu-duck';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { genererUrl } from 'utils/Environment';
import { LinkLoader } from '../../common/content-loaders/LinkLoader';

interface Props {
    className?: string;
    nodes?: MenyNode;
}

const localeSegments: { [locale: string]: string } = { no: 'no', en: 'en', se: 'se' };

// Workaround to get the lang attribute for links to alternative language versions of the site
const getLang = (url: string) => {
    const lastSegment = url.split('/').slice(-1)[0];

    return localeSegments[lastSegment];
};

type ListElementProps = {
    wrap: boolean;
    children: JSX.Element;
};
type ListWrapperProps = {
    className?: string;
    wrap: boolean;
    elements: JSX.Element[];
};

const ListWrapper = ({ className, wrap, elements }: ListWrapperProps): JSX.Element => {
    if (wrap) {
        return <ul className={className}>{elements}</ul>;
    }
    return <>{elements}</>;
};

const ListElement = ({ wrap, children }: ListElementProps) => {
    if (wrap) {
        return <li>{children}</li>;
    }
    return children;
};

export const FooterLenker = ({ className, nodes }: Props) => {
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);

    if (!nodes || !nodes.children) {
        return (
            <ListElement wrap={false}>
                <LinkLoader id={'personvern-loader'} />
            </ListElement>
        );
    }

    const wrap = nodes.children.length > 1;
    const list = nodes.children.map((lenkeNode) => (
        <ListElement wrap={wrap} key={lenkeNode.id}>
            <LenkeMedSporing
                className="globalLenkeFooter"
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
        </ListElement>
    ));

    return <ListWrapper className={className} wrap={wrap} elements={list} />;
};

export default FooterLenker;
