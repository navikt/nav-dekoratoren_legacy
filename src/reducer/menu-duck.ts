import {
    ActionType,
    Handling,
    HentMenyLenkerFAILED,
    HentMenyLenkerPENDING,
    HentMenyLenkerSUCCESS,
} from '../redux/actions';
import { Dispatch } from '../redux/dispatch-type';
import { fetchThenDispatch } from '../api/api-utils';
import { hentMenyPunkter, DataElement, Status } from '../api/api';

export interface MenyPunkter extends DataElement {
    data: Data[];
}

export interface Data {
    displayName: string;
    path: string;
    id?: string;
    hasChildren: boolean;
    children: MenyData[];
}

export interface MenyData {
    displayName: string;
    path: string;
    id?: string;
    hasChildren: boolean;
    children: {}[];
}

export const DataInitState: Data = {
    displayName: '',
    path: '',
    id: '',
    hasChildren: false,
    children: [
        {
            children: [{}],
            displayName: '',
            hasChildren: false,
            path: '',
            id: '',
        },
    ],
};

const initalState: MenyPunkter = {
    data: [DataInitState],
    status: Status.IKKE_STARTET,
};

export default function reducer(
    state: MenyPunkter = initalState,
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
    return fetchThenDispatch<Data[]>(() => hentMenyPunkter(), {
        ok: menypunkterSuksess,
        feilet: menypunkterFeilet,
        pending: menypunkterPending,
    });
}

function menypunkterSuksess(data: Data[]): HentMenyLenkerSUCCESS {
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
