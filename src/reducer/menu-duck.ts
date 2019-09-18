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
    data: MenySpraakSeksjon[];
}

export interface Meny {
    displayName: string;
    path: string;
    id?: string;
    hasChildren: boolean;
    children: {}[];
}

export interface MenySpraakSeksjon {
    displayName: string;
    path: string;
    id?: string;
    hasChildren: boolean;
    children: Meny[];
}

export const DataInitState = {
    displayName: '',
    path: '',
    id: '',
    hasChildren: false,
    children: [
        {
            displayName: '',
            path: '',
            id: '',
            hasChildren: false,
            children: [{}],
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
    return fetchThenDispatch<MenySpraakSeksjon[]>(() => hentMenyPunkter(), {
        ok: menypunkterSuksess,
        feilet: menypunkterFeilet,
        pending: menypunkterPending,
    });
}

function menypunkterSuksess(data: MenySpraakSeksjon[]): HentMenyLenkerSUCCESS {
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
