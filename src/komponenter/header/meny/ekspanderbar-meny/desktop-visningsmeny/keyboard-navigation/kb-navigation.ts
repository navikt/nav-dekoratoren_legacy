import { buildNaviGraphAndGetRootNode } from './kb-navi-graph-builder';

export enum NaviGroup {
    DesktopHeaderDropdown = 'desktop-meny-lenke'
}

export type NaviIndex = {
    col: number,
    row: number,
    sub: number
}

export type NaviGraphData = {
    groupName: NaviGroup,
    rootNode: NaviNode,
    nodeMap: NaviNodeMap,
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

export type IdMap = {
    [id: string]: string
}

type NodeSetterCallback = (node: NaviNode) => void;

export const getKbId = (group: NaviGroup, index: NaviIndex, idMap: IdMap = {}) => {
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

const selectNode = (node: NaviNode, group: NaviGroup, callback: NodeSetterCallback, focus = true) => {
    if (!node) {
        return;
    }
    callback(node);
    if (focus) {
        (document.getElementById(node.id) as HTMLElement)?.focus();
    }
};

const kbHandler = (kbNaviNode: NaviNode, group: NaviGroup, callback: NodeSetterCallback) => (event: KeyboardEvent) => {
    const key = ieKeyMap(event.key) || event.key;
    if (!kbNaviNode) {
        return;
    }
    switch (key) {
        case 'ArrowLeft':
            selectNode(kbNaviNode.left, group, callback);
            break;
        case 'ArrowUp':
            selectNode(kbNaviNode.up, group, callback);
            break;
        case 'ArrowRight':
            selectNode(kbNaviNode.right, group, callback);
            break;
        case 'ArrowDown':
            selectNode(kbNaviNode.down, group, callback);
            break;
        default:
            return;
    }
    event.preventDefault();
};

const focusHandler = (kbNaviNode: NaviNode, graph: NaviGraphData | undefined, callback: NodeSetterCallback) => (event: FocusEvent) => {
    const id = (event.target as HTMLElement).id;
    if (!id || !graph) {
        return;
    }

    const focusedNode = graph.nodeMap[id];
    if (focusedNode) {
        selectNode(focusedNode, graph.groupName, callback)
    } else {
        selectNode(graph.rootNode, graph.groupName, callback, false);
    }
};

const getNaviGraphData = (group: NaviGroup, rootIndex: NaviIndex, maxColsPerSection: number[], idMap: IdMap = {}): NaviGraphData => {
    const nodeMap = {};
    const rootNode = buildNaviGraphAndGetRootNode(group, rootIndex, maxColsPerSection, nodeMap, idMap);
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
    getNaviGraphData
}
