import { ActionType, Handling } from '../redux/actions';

export interface DropdownState {
    hovedmeny: boolean;
    minside: boolean;
    sok: boolean;
}

const initialState: DropdownState = {
    hovedmeny: false,
    minside: false,
    sok: false,
};

export const toggleHovedmeny = () => ({
    type: ActionType.TOGGLE_HOVEDMENY
});

export const toggleMinsideMeny = () => ({
    type: ActionType.TOGGLE_MINSIDE_MENY
});

export const toggleSok = () => ({
    type: ActionType.TOGGLE_SOK
});

export const lukkAlleDropdowns = () => ({
    type: ActionType.TOGGLE_LUKK_ALLE
});

export const reducer = (state: DropdownState = initialState, action: Handling): DropdownState => {
    switch (action.type) {
        case ActionType.TOGGLE_HOVEDMENY: {
            return {...initialState, hovedmeny: !state.hovedmeny};
        }
        case ActionType.TOGGLE_MINSIDE_MENY: {
            return {...initialState, minside: !state.minside};
        }
        case ActionType.TOGGLE_SOK: {
            return {...initialState, sok: !state.sok};
        }
        case ActionType.TOGGLE_LUKK_ALLE: {
            return initialState;
        }
        default:
            return state;
    }
};

export default reducer
