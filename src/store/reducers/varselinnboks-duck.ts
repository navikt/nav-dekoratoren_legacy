import { Dispatch } from 'store/dispatch-type';
import { fetchThenDispatch } from 'api/api-utils';
import { DataElement, hentVarslerFetch, Status } from 'api/api';
import { Handling } from '../actions';
import { ActionType } from '../actions';
import { HentVarslerOKAction } from '../actions';
import { HentVarslerFEILETAction } from '../actions';
import { HentVarslerPENDINGAction } from '../actions';
import { SettVarslerOKAction } from '../actions';
import { SettVarslerLestAction } from '../actions';

export interface VarselinnboksState extends DataElement {
    data: VarslerData;
}

export interface VarslerData {
    uleste: number;
    antall: number;
    nyesteId: number;
    varsler: string;
}

export const initialState: VarselinnboksState = {
    data: {
        uleste: 0,
        antall: 0,
        nyesteId: 0,
        varsler: ``,
    },
    status: Status.IKKE_STARTET,
};

//  Reducer
export default function reducer(
    state: VarselinnboksState = initialState,
    action: Handling
): VarselinnboksState {
    switch (action.type) {
        case ActionType.HENT_VARSLER_OK: {
            return { ...state, status: Status.OK, data: action.data };
        }
        case ActionType.HENT_VARSLER_PENDING:
            if (state.status === Status.OK) {
                return { ...state, status: Status.RELOADING };
            }
            return { ...state, status: Status.PENDING };
        case ActionType.HENT_VARSLER_FEILET:
            return { ...state, status: Status.FEILET };
        case ActionType.SETT_VARSLER_OK:
            return { ...state, status: Status.OK };
        case ActionType.SETT_VARSLER_LEST:
            return { ...state, data: { ...state.data, uleste: 0 } };
        default:
            return state;
    }
}

export function hentVarsler(
    APP_URL: string
): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<VarslerData>(() => hentVarslerFetch(APP_URL), {
        ok: hentVarslerOk,
        feilet: hentVarslerFeilet,
        pending: hentVarslerPending,
    });
}

function hentVarslerOk(data: VarslerData): HentVarslerOKAction {
    return {
        type: ActionType.HENT_VARSLER_OK,
        data: data,
    };
}

function hentVarslerFeilet(): HentVarslerFEILETAction {
    return {
        type: ActionType.HENT_VARSLER_FEILET,
    };
}

function hentVarslerPending(): HentVarslerPENDINGAction {
    return {
        type: ActionType.HENT_VARSLER_PENDING,
    };
}

export const settVarslerOK = (): SettVarslerOKAction => ({
    type: ActionType.SETT_VARSLER_OK,
});

export const settVarslerLest = (): SettVarslerLestAction => ({
    type: ActionType.SETT_VARSLER_LEST,
});
