import { buildGraphAndGetRootNode } from './kb-graph-builder';

export enum NodeGroup {
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

export type NodeIndex = {
    col: number;
    row: number;
    sub: number;
};

export type GraphData = {
    group: NodeGroup;
    rootNode: KbNaviNode;
    nodeMap: KbNaviNodeMap;
};

export type KbNaviNode = {
    id: string;
    index: NodeIndex;
    group: NodeGroup;
    [NodeEdge.Top]: KbNaviNode;
    [NodeEdge.Bottom]: KbNaviNode;
    [NodeEdge.Left]: KbNaviNode;
    [NodeEdge.Right]: KbNaviNode;
};

export type KbNaviNodeMap = {
    [id: string]: KbNaviNode;
};

export type KbIdMap = {
    [id: string]: string;
};

export type NodeSetterCallback = (node: KbNaviNode) => void;

export function createKbNaviNode(
    id: string,
    index: NodeIndex,
    group: NodeGroup
): KbNaviNode {
    const node: Partial<KbNaviNode> = {
        id: id,
        index: index,
        group: group,
    };
    node[NodeEdge.Top] = node as KbNaviNode;
    node[NodeEdge.Bottom] = node as KbNaviNode;
    node[NodeEdge.Left] = node as KbNaviNode;
    node[NodeEdge.Right] = node as KbNaviNode;

    return node as KbNaviNode;
}

export const getKbId = (
    group: NodeGroup,
    index: NodeIndex,
    idMap: KbIdMap = {}
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
    node: KbNaviNode,
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
    currentNode: KbNaviNode,
    setCurrentNode: NodeSetterCallback,
    lukkAlleDropdowns: () => void
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
        case 'Escape':
            lukkAlleDropdowns();
            break;
        default:
            return;
    }
    event.preventDefault();
};

const focusHandler = (
    currentNode: KbNaviNode,
    nodeMap: KbNaviNodeMap,
    setCurrentNode: NodeSetterCallback,
    currentKbHandler: (e: KeyboardEvent) => void
) => (event: FocusEvent) => {
    const id = (event.target as HTMLElement).id;
    const focusedNode = nodeMap[id];
    if (focusedNode) {
        selectNode(focusedNode, setCurrentNode, false);
    } else {
        document.removeEventListener('keydown', currentKbHandler);
    }
};

export const createNaviGraph = (
    group: NodeGroup,
    rootIndex: NodeIndex,
    maxColsPerRow: Array<number>,
    idMap: KbIdMap = {}
): GraphData => {
    const nodeMap = {};
    const rootNode = buildGraphAndGetRootNode(
        group,
        rootIndex,
        maxColsPerRow,
        idMap,
        nodeMap
    );
    return {
        group: group,
        rootNode: rootNode,
        nodeMap: nodeMap,
    };
};

export default {
    getKbId,
    kbHandler,
    focusHandler,
    createNaviGraph,
};
