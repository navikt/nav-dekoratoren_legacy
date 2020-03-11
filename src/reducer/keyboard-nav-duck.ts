import {
    ActionType,
    Handling,
    SettKbCurrentNode,
    SettKbMainGraph,
    SettKbSubGraph,
} from '../redux/actions';
import {
    createNode,
    NaviGraphData,
    NaviGroup,
    NaviNode,
} from '../utils/keyboard-navigation/kb-navigation';
import { desktopHeaderLogoId } from '../komponenter/header/meny/DesktopMenylinje';

export type KeyboardNaviState = {
    currentNode: NaviNode;
    mainGraph: NaviGraphData;
    subGraph?: NaviGraphData;
};

const initialNode = createNode(
    desktopHeaderLogoId,
    { col: 0, row: 0, sub: 0 },
    NaviGroup.HeaderMenylinje
);

const initialGraph = {
    groupName: NaviGroup.HeaderMenylinje,
    rootNode: initialNode,
    nodeMap: { desktopHeaderLogoId: initialNode },
};

const initialState: KeyboardNaviState = {
    currentNode: initialNode,
    mainGraph: initialGraph,
};

export const setKbMainGraph = (graph: NaviGraphData): SettKbMainGraph => ({
    type: ActionType.SETT_KB_MAIN_GRAPH,
    mainGraph: graph,
});

export const setKbSubGraph = (graph: NaviGraphData): SettKbSubGraph => ({
    type: ActionType.SETT_KB_SUB_GRAPH,
    subGraph: graph,
});

export const setCurrentNode = (node: NaviNode): SettKbCurrentNode => ({
    type: ActionType.SETT_KB_NODE_CURRENT,
    currentNode: node,
});

export const reducer = (
    state: KeyboardNaviState = initialState,
    action: Handling
): KeyboardNaviState => {
    if (action.type === ActionType.SETT_KB_MAIN_GRAPH) {
        return { ...state, mainGraph: action.mainGraph };
    }
    if (action.type === ActionType.SETT_KB_SUB_GRAPH) {
        return { ...state, subGraph: action.subGraph };
    }
    if (action.type === ActionType.SETT_KB_NODE_CURRENT) {
        return { ...state, currentNode: action.currentNode };
    }
    return state;
};

export default reducer;
