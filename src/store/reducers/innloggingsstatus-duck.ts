import { ActionType } from 'store/actions';
import { Handling } from 'store/actions';
import { HentInnloggingsstatusPENDINGAction } from 'store/actions';
import { HentInnloggingsstatusOKAction } from 'store/actions';
import { HentInnloggingsstatusFEILETAction } from 'store/actions';
import { Dispatch } from 'store/dispatch-type';
import { fetchThenDispatch } from 'api/api-utils';
import { hentInnloggingsstatusFetch } from 'api/api';
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

            console.log(action.data);

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

export function hentInnloggingsstatus(environment: Environment): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<InnloggingsstatusData & SessionData>(() => hentInnloggingsstatusFetch(environment), {
        ok: hentInnloggingsstatusOk,
        feilet: hentnnloggingsstatusFeilet,
        pending: hentnnloggingsstatusPending,
    });
}

export function hentInnloggingsstatusOk(data: InnloggingsstatusData & SessionData): HentInnloggingsstatusOKAction {
    return {
        type: ActionType.HENT_INNLOGGINGSSTATUS_OK,
        data: data,
    };
}

export function hentnnloggingsstatusFeilet(): HentInnloggingsstatusFEILETAction {
    return {
        type: ActionType.HENT_INNLOGGINGSSTATUS_FEILET,
    };
}

export function hentnnloggingsstatusPending(): HentInnloggingsstatusPENDINGAction {
    return {
        type: ActionType.HENT_INNLOGGINGSSTATUS_PENDING,
    };
}
