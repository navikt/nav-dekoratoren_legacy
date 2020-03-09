import { ActionType, Handling } from '../redux/actions';
import { NaviNode } from '../utils/keyboard-navigation/kb-navigation';
import { act } from 'react-dom/test-utils';

export interface KeyboardNodeState {
    currentNode: NaviNode;
    hovedmeny: NaviNode;
    minside: NaviNode;
    sok: NaviNode;
    varsler: NaviNode;
}

const initialState: KeyboardNodeState = {
    currentNode: null,
    hovedmeny: null,
    minside: null,
    sok: null,
    varsler: null,
};

export const settKeyboardNodes = (nodes: KeyboardNodeState) => ({
    type: ActionType.SETT_KEYBOARD_NODES,
    nodes: nodes,
});

export const settCurrentNode = (currentNode: NaviNode) => ({
    type: ActionType.SETT_KEYBOARD_NODE_CURRENT,
    currentNode: currentNode,
});

export const reducer = (
    state: KeyboardNodeState = initialState,
    action: Handling
): KeyboardNodeState => {
    if (action.type === ActionType.SETT_KEYBOARD_NODES) {
        return { ...action.nodes, currentNode: state.currentNode };
    }
    if (action.type === ActionType.SETT_KEYBOARD_NODE_CURRENT) {
        return { ...state, currentNode: action.currentNode };
    }
    return state;
};

export default reducer;
