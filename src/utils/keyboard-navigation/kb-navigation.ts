import { buildNaviGraphAndGetRootNode } from './kb-navi-graph-builder';

export enum NaviGroup {
    DesktopHovedmeny = 'desktop-hovedmeny',
    DesktopSokDropdown = 'desktop-sok',
    DesktopVarslerDropdown = 'desktop-varsler',
    DesktopMinsideMeny = 'desktop-minside',
}

export enum NodeEdge {
    Top,
    Bottom,
    Left,
    Right,
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
    [NodeEdge.Top]: NaviNode;
    [NodeEdge.Bottom]: NaviNode;
    [NodeEdge.Left]: NaviNode;
    [NodeEdge.Right]: NaviNode;
    connect: typeof connectNodes;
} | null;

export type NaviNodeMap = {
    [id: string]: NaviNode;
};

export type IdMap = {
    [id: string]: string;
};

type NodeSetterCallback = (node: NaviNode) => void;

export const createNode = (id: string, index: NaviIndex): NaviNode => ({
    id: id,
    index: index,
    [NodeEdge.Top]: null,
    [NodeEdge.Bottom]: null,
    [NodeEdge.Left]: null,
    [NodeEdge.Right]: null,
    connect: connectNodes,
});

function connectNodes(this: NaviNode, node: NaviNode, edge: NodeEdge) {
    if (!this || !node) {
        return;
    }
    switch (edge) {
        case NodeEdge.Top:
            this[NodeEdge.Top] = node;
            node[NodeEdge.Bottom] = this;
            return;
        case NodeEdge.Bottom:
            this[NodeEdge.Bottom] = node;
            node[NodeEdge.Top] = this;
            return;
        case NodeEdge.Left:
            this[NodeEdge.Left] = node;
            node[NodeEdge.Right] = this;
            return;
        case NodeEdge.Right:
            this[NodeEdge.Right] = node;
            node[NodeEdge.Left] = this;
            return;
    }
}

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
            selectNode(node[NodeEdge.Left], group, callback);
            break;
        case 'ArrowUp':
            selectNode(node[NodeEdge.Top], group, callback);
            break;
        case 'ArrowRight':
            selectNode(node[NodeEdge.Right], group, callback);
            break;
        case 'ArrowDown':
            selectNode(node[NodeEdge.Bottom], group, callback);
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
