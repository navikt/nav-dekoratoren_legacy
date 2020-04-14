import { ActionType, Handling } from '../state/actions';

export interface DropdownState {
    hovedmeny: boolean;
    minside: boolean;
    sok: boolean;
    varsel: boolean;
    undermeny: boolean;
    varsler: boolean;
}

export const initialState: DropdownState = {
    hovedmeny: false,
    minside: false,
    sok: false,
    varsel: false,
    undermeny: false,
    varsler: false,
};

export const toggleUndermenyVisning = () => ({
    type: ActionType.TOGGLE_UNDERMENY,
});

export const toggleVarselVisning = () => ({
    type: ActionType.TOGGLE_VARSEL,
});

export const toggleHovedmeny = () => ({
    type: ActionType.TOGGLE_HOVEDMENY,
});

export const toggleMinsideMeny = () => ({
    type: ActionType.TOGGLE_MINSIDE_MENY,
});

export const toggleSok = () => ({
    type: ActionType.TOGGLE_SOK,
});

export const toggleVarsler = () => ({
    type: ActionType.TOGGLE_VARSLER,
});

export const lukkAlleDropdowns = () => ({
    type: ActionType.TOGGLE_LUKK_ALLE,
});

export const reducer = (
    state: DropdownState = initialState,
    action: Handling
): DropdownState => {
    switch (action.type) {
        case ActionType.TOGGLE_HOVEDMENY: {
            return { ...initialState, hovedmeny: !state.hovedmeny };
        }
        case ActionType.TOGGLE_MINSIDE_MENY: {
            return { ...initialState, minside: !state.minside };
        }
        case ActionType.TOGGLE_SOK: {
            return { ...initialState, sok: !state.sok };
        }
        case ActionType.TOGGLE_VARSEL: {
            return { ...initialState, varsel: !state.varsel };
        }
        case ActionType.TOGGLE_UNDERMENY: {
            return { ...state, undermeny: !state.undermeny };
        }
        case ActionType.TOGGLE_VARSLER: {
            return { ...initialState, varsler: !state.varsler };
        }
        case ActionType.TOGGLE_LUKK_ALLE: {
            return initialState;
        }
        default:
            return state;
    }
};

export default reducer;
