import GraphBuilder from './kb-navi-graph-builder';

export enum NaviGroup {
    DesktopHeaderDropdown = 'desktop-meny-lenke'
}

export type NaviIndex = {
    x: number,
    y: number,
    sub: number
}

export type NaviGraphData = {
    groupName: NaviGroup,
    rootNode: NaviNode,
    nodeMap: NaviNodeMap,
    indexToIdMappings?: IndexToIdMappings
}

export type NaviNode = {
    id: string,
    index: NaviIndex,
    up: NaviNode,
    down: NaviNode,
    left: NaviNode,
    right: NaviNode
} | null

export type NaviNodeMap = {
    [id: string]: NaviNode
}

export type IndexToIdMappings = {
    [index: string]: string
}

const idLookup = (naviGroup: NaviGroup, x: number, y: number, sub: number) => {
    if (naviGroup === NaviGroup.DesktopHeaderDropdown && x === 0 && y === 0 && sub === 0) {
        return 'decorator-meny-toggleknapp-desktop';
    }

    return null;
};

export const getId = (naviGroup: NaviGroup, x: number, y: number, subIndex = 0) => (
    idLookup(naviGroup, x, y, subIndex) || `${naviGroup}_${x}_${y}_${subIndex}`
);

export const getIndexFromId = (navGroup: NaviGroup, id: string): NaviIndex | null => {
    const [groupId, x, y, sub] = id.split('_');
    if (groupId === navGroup && x && y && sub) {
        return {x: parseInt(x, 10), y: parseInt(y, 10), sub: parseInt(sub, 10)}
    }
    return null;
};

export const getElement = (naviGroup: NaviGroup, ni: NaviIndex) =>
    document.getElementById(getId(naviGroup, ni.x, ni.y, ni.sub)) as HTMLElement;

export const setFocus = (group: NaviGroup, naviNode: NaviNode): boolean => {
    if (!naviNode) {
        return false;
    }

    const element = getElement(group, naviNode.index);
    if (!element) {
        return false;
    }

    element.focus();
    return true;
};

export const getNaviGraphData = (group: NaviGroup, rootIndex: NaviIndex, maxColsPerSection: Array<number>): NaviGraphData => {
    const nodeMap = {};
    const rootNode = GraphBuilder.buildNaviGraphAndGetRootNode(group, rootIndex, maxColsPerSection, nodeMap);
    return {
        groupName: group,
        rootNode: rootNode,
        nodeMap: nodeMap,
    };
};

export default {
    getId,
    getElement
}
