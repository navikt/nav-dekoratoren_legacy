import { buildGraphAndGetRootNode } from './kb-graph-builder';
import { logAmplitudeEvent } from '../analytics/amplitude';

export enum KbNavGroup {
    HeaderMenylinje = 'desktop-header-menylinje',
    Hovedmeny = 'desktop-hovedmeny',
    Sok = 'desktop-sok',
    Varsler = 'desktop-varsler',
    Minsidemeny = 'desktop-minside',
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

export type KbNavGraph = {
    group: KbNavGroup;
    rootNode: KbNavNode;
    nodeMap: KbNavNodeMap;
};

export type KbNavNode = {
    id: string;
    index: NodeIndex;
    group: KbNavGroup;
    [NodeEdge.Top]: KbNavNode;
    [NodeEdge.Bottom]: KbNavNode;
    [NodeEdge.Left]: KbNavNode;
    [NodeEdge.Right]: KbNavNode;
};

export type KbNavNodeMap = {
    [id: string]: KbNavNode;
};

export type KbIdMap = {
    [id: string]: string;
};

type NodeSetterCallback = (node: KbNavNode) => void;

export function createKbNavNode(id: string, index: NodeIndex, group: KbNavGroup): KbNavNode {
    const node: Partial<KbNavNode> = {
        id: id,
        index: index,
        group: group,
    };
    node[NodeEdge.Top] = node as KbNavNode;
    node[NodeEdge.Bottom] = node as KbNavNode;
    node[NodeEdge.Left] = node as KbNavNode;
    node[NodeEdge.Right] = node as KbNavNode;

    return node as KbNavNode;
}

export const getKbId = (group: KbNavGroup, index: NodeIndex, idMap: KbIdMap = {}) => {
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
        window.scrollTo(0, viewOffset + (minMargin - marginBottom) * viewHeight);
        return;
    }
};

const isInputField = (node: KbNavNode) => document.getElementById(node.id)?.tagName.toLowerCase() === 'input';

export const selectNode = (node: KbNavNode, callback: NodeSetterCallback = () => null, focus = true) => {
    if (!node) {
        return;
    }
    const element = document.getElementById(node.id) as HTMLElement;
    if (!element) {
        return;
    }
    logAmplitudeEvent('piltast-navigasjon', { linkId: node.id, linkGroup: node.group });
    callback(node);
    if (focus) {
        element.focus();
        scrollIfNearViewBounds(element);
    }
};

const arrowkeysHandler = (currentNode: KbNavNode, setCurrentNode: NodeSetterCallback) => (event: KeyboardEvent) => {
    if (!currentNode?.id) {
        return;
    }
    const key = ieKeyMap(event.key) || event.key;
    switch (key) {
        case 'ArrowLeft':
            if (isInputField(currentNode)) {
                return;
            }
            selectNode(currentNode[NodeEdge.Left], setCurrentNode);
            break;
        case 'ArrowUp':
            selectNode(currentNode[NodeEdge.Top], setCurrentNode);
            break;
        case 'ArrowRight':
            if (isInputField(currentNode)) {
                return;
            }
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

const focusHandler =
    (
        currentNode: KbNavNode,
        nodeMap: KbNavNodeMap,
        setCurrentNode: NodeSetterCallback,
        kbNavHandler: (e: KeyboardEvent) => void
    ) =>
    (event: FocusEvent) => {
        const id = (event.target as HTMLElement).id;
        const focusedNode = nodeMap[id];
        if (focusedNode) {
            selectNode(focusedNode, setCurrentNode, false);
        } else {
            document.removeEventListener('keydown', kbNavHandler);
        }
    };

export const createKbNavGraph = (
    group: KbNavGroup,
    rootIndex: NodeIndex,
    maxColsPerRow: Array<number>,
    idMap: KbIdMap = {}
): KbNavGraph => {
    const nodeMap = {};
    const rootNode = buildGraphAndGetRootNode(group, rootIndex, maxColsPerRow, idMap, nodeMap);
    return {
        group: group,
        rootNode: rootNode,
        nodeMap: nodeMap,
    };
};

export default {
    getKbId,
    arrowkeysHandler,
    focusHandler,
    createKbNavGraph,
};
