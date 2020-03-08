import { ActionType, Handling } from '../redux/actions';
import { NaviNode } from '../utils/keyboard-navigation/kb-navigation';

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

export const reducer = (
    state: KeyboardNodeState = initialState,
    action: Handling
): KeyboardNodeState => {
    if (action.type === ActionType.SETT_KEYBOARD_NODES) {
        return action.nodes;
    }
    return state;
};

export default reducer;
