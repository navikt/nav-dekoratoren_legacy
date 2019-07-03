import {
    ActionType,
    Handling,
    HentSokeResultatFEILETAction,
    HentSokeResultatOKAction,
    HentSokeResultatPENDINGAction,
} from './actions';
import { JSONObject } from 'yet-another-fetch-mock';
import { Dispatch } from './dispatch-type';
import { fetchThenDispatch } from '../api/fetch-utils';
import { hentSokeResultatFetch } from '../api/api';
import { DataElement, Status } from '../api/Datalaster';

export interface SokeResultatState extends DataElement {
    data: Data;
}

export interface Data extends JSONObject {}

const initialState: SokeResultatState = {
    data: {},
    status: Status.IKKE_STARTET,
};

//  Reducer
export default function reducer(
    state: SokeResultatState = initialState,
    action: Handling
): SokeResultatState {
    switch (action.type) {
        case ActionType.HENT_SOKERESULTAT_OK: {
            return { ...state, status: Status.OK, data: action.data };
        }
        case ActionType.HENT_SOKERESULTAT_PENDING:
            if (state.status === Status.OK) {
                return { ...state, status: Status.RELOADING };
            }
            return { ...state, status: Status.PENDING };
        case ActionType.HENT_SOKERESULTAT_FEILET:
            return { ...state, status: Status.FEILET };
        default:
            return state;
    }
}

export function hentSokeResultat(): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<Data>(() => hentSokeResultatFetch(), {
        ok: hentSokeResultatOk,
        feilet: hentSokeResultatFeilet,
        pending: hentSokeResultatPending,
    });
}

function hentSokeResultatOk(data: Data): HentSokeResultatOKAction {
    return {
        type: ActionType.HENT_SOKERESULTAT_OK,
        data: data,
    };
}

function hentSokeResultatFeilet(): HentSokeResultatFEILETAction {
    return {
        type: ActionType.HENT_SOKERESULTAT_FEILET,
    };
}

function hentSokeResultatPending(): HentSokeResultatPENDINGAction {
    return {
        type: ActionType.HENT_SOKERESULTAT_PENDING,
    };
}
