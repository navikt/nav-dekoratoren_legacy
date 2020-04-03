import {
    ActionType,
    Handling,
    HentVarslerFEILETAction,
    HentVarslerOKAction,
    HentVarslerPENDINGAction,
    SettVarslerOKAction,
} from '../redux/actions';
import { Dispatch } from '../redux/dispatch-type';
import { fetchThenDispatch } from '../api/api-utils';
import { hentVarslerFetch } from '../api/api';
import { DataElement, Status } from '../api/api';

export interface VarselinnboksState extends DataElement {
    data: Data;
}

export interface Data {
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
        varsler:
            '<div class="panel nav-varsler">\n    <p class="text-center">Du har ingen varsler å vise.</p>\n</div>',
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
        default:
            return state;
    }
}

export function hentVarsler(
    APP_BASE_URL: string
): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<Data>(() => hentVarslerFetch(APP_BASE_URL), {
        ok: hentVarslerOk,
        feilet: hentVarslerFeilet,
        pending: hentVarslerPending,
    });
}

function hentVarslerOk(data: Data): HentVarslerOKAction {
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
