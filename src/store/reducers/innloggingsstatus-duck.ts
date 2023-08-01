import {
    ActionType,
    DebugInnloggingOKAction,
    FornyInnloggingFEILETAction,
    FornyInnloggingOKAction,
    FornyInnloggingPENDINGAction,
} from 'store/actions';
import { Handling } from 'store/actions';
import { HentInnloggingsstatusPENDINGAction } from 'store/actions';
import { HentInnloggingsstatusOKAction } from 'store/actions';
import { HentInnloggingsstatusFEILETAction } from 'store/actions';
import { Dispatch } from 'store/dispatch-type';
import { fetchThenDispatch } from 'api/api-utils';
import { fornyInnloggingFetch, hentInnloggingsstatusFetch } from 'api/api';
import { DataElement, Status } from 'api/api';
import { formaterFodselsnummer } from '../../utils/string-format';
import { Environment } from './environment-duck';

export interface InnloggingsstatusState extends DataElement {
    data: InnloggingsstatusData & SessionData;
}

export interface InnloggingsstatusData {
    authenticated: boolean;
    name: string;
    securityLevel: string;
}

export interface SessionData {
    session: {
        createdAt: string | null;
        endsAt: string | null;
        timeoutAt: string | null;
        isActive: boolean;
    };
    token: {
        endsAt: string | null;
        refreshedAt: string | null;
        isRefreshCooldown: boolean;
    };
}

const initialState: InnloggingsstatusState = {
    data: {
        authenticated: false,
        name: '',
        securityLevel: '',
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
export default function reducer(
    state: InnloggingsstatusState = initialState,
    action: Handling
): InnloggingsstatusState {
    switch (action.type) {
        case ActionType.HENT_INNLOGGINGSSTATUS_OK: {
            const erFodselsnummer = /^\d+$/.test(action.data.name);
            if (erFodselsnummer) {
                action.data.name = formaterFodselsnummer(action.data.name);
            }

            return { ...state, status: Status.OK, data: action.data };
        }
        case ActionType.FORNY_INNLOGGING_OK: {
            console.log('FORNY_INNLOGGING', action.data);

            return { ...state, data: { ...state.data, session: action.data.session, token: action.data.token } };
        }
        case ActionType.DEBUG_INNLOGGING_OK: {
            const { fakeTokenEndsAt, fakeSessionEndsAt } = action.data;

            const sessionEnding = fakeSessionEndsAt ? { endsAt: fakeSessionEndsAt } : null;
            const tokenEnding = fakeTokenEndsAt ? { endsAt: fakeTokenEndsAt } : null;

            return {
                ...state,
                data: {
                    ...state.data,
                    session: { ...state.data.session, ...sessionEnding },
                    token: { ...state.data.token, ...tokenEnding },
                },
            };
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

// Thunks
// ------------------------------------------------------------------------------
export function hentInnloggingsstatus(environment: Environment): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<InnloggingsstatusData & SessionData>(() => hentInnloggingsstatusFetch(environment), {
        ok: hentInnloggingsstatusOk,
        feilet: hentInnloggingsstatusFeilet,
        pending: hentnnloggingsstatusPending,
    });
}

export function fornyInnlogging(environment: Environment): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<SessionData>(() => fornyInnloggingFetch(environment), {
        ok: fornyInnloggingOK,
        feilet: fornyInnloggingFeilet,
        pending: fornyInnloggingPending,
    });
}

// Action Creators
// ------------------------------------------------------------------------------
export function hentInnloggingsstatusOk(data: InnloggingsstatusData & SessionData): HentInnloggingsstatusOKAction {
    return {
        type: ActionType.HENT_INNLOGGINGSSTATUS_OK,
        data: data,
    };
}

export function hentInnloggingsstatusFeilet(): HentInnloggingsstatusFEILETAction {
    return {
        type: ActionType.HENT_INNLOGGINGSSTATUS_FEILET,
    };
}

export function hentnnloggingsstatusPending(): HentInnloggingsstatusPENDINGAction {
    return {
        type: ActionType.HENT_INNLOGGINGSSTATUS_PENDING,
    };
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

export function debugInnloggingOK(data: any): DebugInnloggingOKAction {
    return {
        type: ActionType.DEBUG_INNLOGGING_OK,
        data: data,
    };
}
