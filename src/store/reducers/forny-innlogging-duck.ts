import {
    ActionType,
    FornyInnloggingFEILETAction,
    FornyInnloggingOKAction,
    FornyInnloggingPENDINGAction,
} from 'store/actions';
import { Handling } from 'store/actions';
import { Dispatch } from 'store/dispatch-type';
import { fetchThenDispatch } from 'api/api-utils';
import { DataElement, Status, fornyInnloggingFetch } from 'api/api';
import { formaterFodselsnummer } from '../../utils/string-format';
import { Environment } from './environment-duck';
import { SessionData } from './innloggingsstatus-duck';

export interface FornyInnloggingState extends DataElement {
    data: SessionData;
}

const initialState: FornyInnloggingState = {
    data: {
        session: {
            createdAt: null,
            endsAt: null,
            timeoutAt: null,
            isActive: false,
        },
        token: {
            endsAt: null,
            refreshedAt: null,
            isRefreshCooldown: false,
        },
    },
    status: Status.IKKE_STARTET,
};

//  Reducer
export default function reducer(state: FornyInnloggingState = initialState, action: Handling): FornyInnloggingState {
    switch (action.type) {
        case ActionType.HENT_INNLOGGINGSSTATUS_OK: {
            const erFodselsnummer = /^\d+$/.test(action.data.name);
            if (erFodselsnummer) {
                action.data.name = formaterFodselsnummer(action.data.name);
            }

            return { ...state, status: Status.OK, data: action.data };
        }
        case ActionType.HENT_INNLOGGINGSSTATUS_PENDING:
            if (state.status === Status.OK) {
                return { ...state, status: Status.RELOADING };
            }
            return { ...state, status: Status.PENDING };
        case ActionType.HENT_INNLOGGINGSSTATUS_FEILET:
            return { ...state, status: Status.FEILET };
        default:
            return state;
    }
}

export function fornyInnlogging(environment: Environment): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<SessionData>(() => fornyInnloggingFetch(environment), {
        ok: fornyInnloggingOK,
        feilet: fornyInnloggingFeilet,
        pending: fornyInnloggingPending,
    });
}

export function fornyInnloggingOK(data: SessionData): FornyInnloggingOKAction {
    return {
        type: ActionType.FORNY_INNLOGGING_OK,
        data: data,
    };
}

export function fornyInnloggingFeilet(): FornyInnloggingFEILETAction {
    return {
        type: ActionType.FORNY_INNLOGGING_FEILET,
    };
}

export function fornyInnloggingPending(): FornyInnloggingPENDINGAction {
    return {
        type: ActionType.FORNY_INNLOGGING_PENDING,
    };
}
