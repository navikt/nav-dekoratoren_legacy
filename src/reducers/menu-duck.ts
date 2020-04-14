import { ActionType } from 'state/actions';
import { Handling } from 'state/actions';
import { HentMenyLenkerFAILED } from 'state/actions';
import { HentMenyLenkerSUCCESS } from 'state/actions';
import { HentMenyLenkerPENDING } from 'state/actions';
import { Dispatch } from 'state/dispatch-type';
import { fetchThenDispatch } from 'api/api-utils';
import { hentMenyPunkter, DataElement, Status } from 'api/api';

export interface MenyPunkter extends DataElement {
    data: MenyNode[];
}

export interface MenyNode {
    displayName: string;
    path: string;
    id?: string;
    hasChildren: boolean;
    children: MenyNode[];
}

export const dataInitState: MenyNode = {
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
            children: [],
        },
    ],
};

const initalState: MenyPunkter = {
    data: [dataInitState],
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

export function fetchMenypunkter(
    APP_BASE_URL: string
): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<MenyNode[]>(() => hentMenyPunkter(APP_BASE_URL), {
        ok: menypunkterSuksess,
        feilet: menypunkterFeilet,
        pending: menypunkterPending,
    });
}

function menypunkterSuksess(data: MenyNode[]): HentMenyLenkerSUCCESS {
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
