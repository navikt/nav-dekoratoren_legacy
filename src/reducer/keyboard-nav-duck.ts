import {
    ActionType,
    Handling,
    SettKbCurrentNode,
    SettKbMainGraph,
    SettKbSubGraph,
} from '../redux/actions';
import {
    GraphData,
    KbNaviNode,
} from '../utils/keyboard-navigation/kb-navigation';
import { initialMainGraph } from '../utils/keyboard-navigation/kb-navigation-setup';

export type KeyboardNaviState = {
    currentNode: KbNaviNode;
    mainGraph: GraphData;
    subGraph?: GraphData;
};

const initialState: KeyboardNaviState = {
    currentNode: initialMainGraph.rootNode,
    mainGraph: initialMainGraph,
};

export const setKbMainGraph = (graph: GraphData): SettKbMainGraph => ({
    type: ActionType.SETT_KB_MAIN_GRAPH,
    mainGraph: graph,
});

export const setKbSubGraph = (graph: GraphData): SettKbSubGraph => ({
    type: ActionType.SETT_KB_SUB_GRAPH,
    subGraph: graph,
});

export const setCurrentNode = (node: KbNaviNode): SettKbCurrentNode => ({
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
