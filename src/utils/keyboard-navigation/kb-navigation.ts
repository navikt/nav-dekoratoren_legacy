import { buildNaviGraphAndGetRootNode } from './kb-navi-graph-builder';

export enum NaviGroup {
    Hovedmeny = 'desktop-meny-lenke',
    MinsideMeny = 'desktop-minside-lenke',
    Varsler = 'desktop-varsel-lenke',
}

export type NaviIndex = {
    col: number;
    row: number;
    sub: number;
};

export type NaviGraphData = {
    groupName: NaviGroup;
    rootNode: NaviNode;
    nodeMap: NaviNodeMap;
};

export type NaviNode = {
    id: string;
    index: NaviIndex;
    up: NaviNode;
    down: NaviNode;
    left: NaviNode;
    right: NaviNode;
} | null;

export type NaviNodeMap = {
    [id: string]: NaviNode;
};

export type IdMap = {
    [id: string]: string;
};

type NodeSetterCallback = (node: NaviNode) => void;

export const getKbId = (
    group: NaviGroup,
    index: NaviIndex,
    idMap: IdMap = {}
) => {
    const id = `${group}_${index.col}_${index.row}_${index.sub}`;
    return idMap[id] || id;
};

const ieKeyMap = (key: string) => {
    switch (key) {
        case 'Left':
            return 'ArrowLeft';
        case 'Up':
            return 'ArrowUp';
        case 'Right':
            return 'ArrowRight';
        case 'Down':
            return 'ArrowDown';
        default:
            return null;
    }
};

const scrollIfNearViewBounds = (element: HTMLElement) => {
    const minMargin = 0.1;

    const rect = element.getBoundingClientRect();
    const viewHeight = window.innerHeight;
    const viewOffset = window.pageYOffset;

    const marginTop = rect.top / viewHeight;
    if (marginTop < minMargin) {
        window.scrollTo(0, viewOffset - (minMargin - marginTop) * viewHeight);
        return;
    }

    const marginBottom = 1 - rect.bottom / viewHeight;
    if (marginBottom < minMargin) {
        window.scrollTo(
            0,
            viewOffset + (minMargin - marginBottom) * viewHeight
        );
        return;
    }
};

const selectNode = (
    node: NaviNode,
    group: NaviGroup,
    callback: NodeSetterCallback,
    focus = true
) => {
    if (!node) {
        return;
    }
    callback(node);
    if (focus) {
        const element = document.getElementById(node.id) as HTMLElement;
        if (!element) {
            return;
        }
        element.focus();
        scrollIfNearViewBounds(element);
    }
};

const kbHandler = (
    node: NaviNode,
    group: NaviGroup,
    callback: NodeSetterCallback
) => (event: KeyboardEvent) => {
    if (!node) {
        return;
    }
    const key = ieKeyMap(event.key) || event.key;
    switch (key) {
        case 'ArrowLeft':
            selectNode(node.left, group, callback);
            break;
        case 'ArrowUp':
            selectNode(node.up, group, callback);
            break;
        case 'ArrowRight':
            selectNode(node.right, group, callback);
            break;
        case 'ArrowDown':
            selectNode(node.down, group, callback);
            break;
        default:
            return;
    }
    event.preventDefault();
};

const focusHandler = (
    currentNode: NaviNode,
    graph: NaviGraphData | undefined,
    callback: NodeSetterCallback
) => (event: FocusEvent) => {
    const id = (event.target as HTMLElement).id;
    if (!id || !graph || !currentNode || currentNode.id === id) {
        return;
    }

    const focusedNode = graph.nodeMap[id];
    if (focusedNode) {
        selectNode(focusedNode, graph.groupName, callback, false);
    } else {
        selectNode(graph.rootNode, graph.groupName, callback, false);
    }
};

const getNaviGraphData = (
    group: NaviGroup,
    rootIndex: NaviIndex,
    maxColsPerRow: number[],
    idMap: IdMap = {}
): NaviGraphData => {
    const nodeMap = {};
    const rootNode = buildNaviGraphAndGetRootNode(
        group,
        rootIndex,
        maxColsPerRow,
        nodeMap,
        idMap
    );
    return {
        groupName: group,
        rootNode: rootNode,
        nodeMap: nodeMap,
    };
};

export default {
    getKbId,
    kbHandler,
    focusHandler,
    getNaviGraphData,
};
