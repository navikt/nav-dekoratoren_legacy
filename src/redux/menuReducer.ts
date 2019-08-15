import {
    ActionType,
    Handling,
    HentMenyLenkerFAILED,
    HentMenyLenkerPENDING,
    HentMenyLenkerSUCCESS,
} from './actions';
import { Dispatch } from './dispatch-type';
import { fetchThenDispatch } from '../api/fetch-utils';
import { hentMenyPunkter } from '../api/api';

export interface Interface {}

export enum Status {
    OK = 'OK',
    FEILET = 'FEILET',
    PENDING = 'PENDING',
    IKKE_STARTET = 'IKKE_STARTET',
    RELOADING = 'RELOADING',
}

export interface DataStatus {
    status: Status;
}

export interface MenyPunkter extends DataStatus {
    data: Array<object>;
}

export interface Data {
    menu: Array<object>;
}

const inittalState: MenyPunkter = {
    data: [{}],
    status: Status.IKKE_STARTET,
};

export default function reducer(
    state: MenyPunkter = inittalState,
    action: Handling
): MenyPunkter {
    switch (action.type) {
        case ActionType.HENT_MENY_OK: {
            return { ...state, status: Status.OK, data: action.data };
        }
        case ActionType.HENT_MENY_PENDING:
            if (state.status === Status.OK) {
                return { ...state, status: Status.RELOADING };
            }
            return { ...state, status: Status.PENDING };
        case ActionType.HENT_MENY_FEILET: {
            return { ...state, status: Status.FEILET };
        }
        default:
            return state;
    }
}

export function fetchMenypunkter(): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<Array<object>>(() => hentMenyPunkter(), {
        ok: menypunkterSuksess,
        feilet: menypunkterFeilet,
        pending: menypunkterPending,
    });
}

function menypunkterSuksess(data: Array<object>): HentMenyLenkerSUCCESS {
    return {
        type: ActionType.HENT_MENY_OK,
        data: data,
    };
}

function menypunkterPending(): HentMenyLenkerPENDING {
    return {
        type: ActionType.HENT_MENY_PENDING,
    };
}

function menypunkterFeilet(): HentMenyLenkerFAILED {
    return {
        type: ActionType.HENT_MENY_FEILET,
    };
}
