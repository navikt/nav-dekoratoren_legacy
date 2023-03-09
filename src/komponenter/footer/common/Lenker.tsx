import React from 'react';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import { MenyNode } from 'store/reducers/menu-duck';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { genererUrl } from 'utils/Environment';
import { LinkLoader } from '../../common/content-loaders/LinkLoader';

interface Props {
    nodes?: MenyNode;
}

const localeSegments: { [locale: string]: string } = { no: 'no', en: 'en', se: 'se' };

// Workaround to get the lang attribute for links to alternative language versions of the site
const getLang = (url: string) => {
    const lastSegment = url.split('/').slice(-1)[0];

    return localeSegments[lastSegment];
};

type ListElementProps = {
    wrap: boolean,
    key?: React.Key,
    children: JSX.Element,
}
type ListWrapperProps = {
    wrap: boolean,
    elements: JSX.Element[],
}

const ListWrapper = ({wrap, elements}: ListWrapperProps):JSX.Element => {
    if (wrap) {
        return <ul>{elements}</ul>
    }
    return <>{elements}</>
};

const ListElement = ({wrap, key, children}: ListElementProps) => {
    if (wrap) {
        return <li key={key}>{children}</li>
    }
    return children;
};

export const FooterLenker = ({ nodes }: Props) => {
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);

    if (!nodes || !nodes.children) {
        return (
            <ListElement wrap={false} children={<LinkLoader id={'personvern-loader'} />} />
        );
    }

    const wrap = nodes.children.length > 1;
    const list = nodes.children.map((lenkeNode) => (
        <ListElement
            wrap={wrap}
            key={lenkeNode.id}
            children={
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
            }
        />
    ));

    return (
        <ListWrapper wrap={wrap} elements={list} />
    );
};

export default FooterLenker;
