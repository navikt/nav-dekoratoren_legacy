import { buildNaviGraphAndGetRootNode } from './kb-navi-graph-builder';

export enum NaviGroup {
    HeaderMenylinje = 'desktop-header-menylinje',
    Hovedmeny = 'desktop-hovedmeny',
    Sok = 'desktop-sok',
    Varsler = 'desktop-varsler',
    MinsideMeny = 'desktop-minside',
}

export enum NodeEdge {
    Top = 'Top',
    Bottom = 'Bottom',
    Left = 'Left',
    Right = 'Right',
}

export const NodeEdgeOpposite = {
    [NodeEdge.Top]: NodeEdge.Bottom,
    [NodeEdge.Bottom]: NodeEdge.Top,
    [NodeEdge.Left]: NodeEdge.Right,
    [NodeEdge.Right]: NodeEdge.Left,
};

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
    group: NaviGroup;
    [NodeEdge.Top]: NaviNode;
    [NodeEdge.Bottom]: NaviNode;
    [NodeEdge.Left]: NaviNode;
    [NodeEdge.Right]: NaviNode;
};

export type NaviNodeMap = {
    [id: string]: NaviNode;
};

export type IdMap = {
    [id: string]: string;
};

export type NodeSetterCallback = (node: NaviNode) => void;

export function createNode(
    id: string,
    index: NaviIndex,
    group: NaviGroup
): NaviNode {
    const node: Partial<NaviNode> = {
        id: id,
        index: index,
        group: group,
    };
    node[NodeEdge.Top] = node as NaviNode;
    node[NodeEdge.Bottom] = node as NaviNode;
    node[NodeEdge.Left] = node as NaviNode;
    node[NodeEdge.Right] = node as NaviNode;

    return node as NaviNode;
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

export const selectNode = (
    node: NaviNode,
    callback: NodeSetterCallback = () => null,
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
    currentNode: NaviNode,
    setCurrentNode: NodeSetterCallback
) => (event: KeyboardEvent) => {
    if (!currentNode) {
        return;
    }
    const key = ieKeyMap(event.key) || event.key;
    switch (key) {
        case 'ArrowLeft':
            selectNode(currentNode[NodeEdge.Left], setCurrentNode);
            break;
        case 'ArrowUp':
            selectNode(currentNode[NodeEdge.Top], setCurrentNode);
            break;
        case 'ArrowRight':
            selectNode(currentNode[NodeEdge.Right], setCurrentNode);
            break;
        case 'ArrowDown':
            selectNode(currentNode[NodeEdge.Bottom], setCurrentNode);
            break;
        default:
            return;
    }
    event.preventDefault();
};

const focusHandler = (
    currentNode: NaviNode,
    nodeMap: NaviNodeMap,
    setCurrentNode: NodeSetterCallback,
    currentKbHandler: (e: KeyboardEvent) => void
) => (event: FocusEvent) => {
    const id = (event.target as HTMLElement).id;
    if (!id || !currentNode || currentNode.id === id) {
        return;
    }

    const focusedNode = nodeMap[id];
    if (focusedNode) {
        selectNode(focusedNode, setCurrentNode, false);
    } else {
        // selectNode(graph.rootNode, setCurrentNode, false);
        document.removeEventListener('keydown', currentKbHandler);
    }
};

export const createNaviGraph = (
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
        idMap,
        nodeMap
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
    getNaviGraphData: createNaviGraph,
};
