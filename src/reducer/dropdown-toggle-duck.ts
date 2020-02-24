import { ActionType, Handling } from '../redux/actions';

export interface DropdownState {
    uinnlogget: boolean;
    minside: boolean;
    sok: boolean;
}

const initialState: DropdownState = {
    uinnlogget: false,
    minside: false,
    sok: false,
};

export const toggleUinnloggetMeny = () => ({
    type: ActionType.TOGGLE_UINNLOGGET_MENY
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
        case ActionType.TOGGLE_UINNLOGGET_MENY: {
            return {...state, uinnlogget: !state.uinnlogget};
        }
        case ActionType.TOGGLE_MINSIDE_MENY: {
            return {...state, minside: !state.minside};
        }
        case ActionType.TOGGLE_SOK: {
            return {...state, sok: !state.sok};
        }
        case ActionType.TOGGLE_LUKK_ALLE: {
            return initialState;
        }
        default:
            return state;
    }
};

export default reducer
