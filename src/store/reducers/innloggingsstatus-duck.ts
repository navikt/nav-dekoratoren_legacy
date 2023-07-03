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

export interface InnloggingsstatusState extends DataElement {
    data: Data;
}

export interface Data {
    authenticated: boolean;
    name: string;
    securityLevel: string;
    sessionExpires: number;
    isSessionActive: boolean;
    tokenExpires: number;
}

const initialState: InnloggingsstatusState = {
    data: {
        authenticated: false,
        name: '',
        securityLevel: '',
        sessionExpires: 0,
        isSessionActive: false,
        tokenExpires: 0,
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

export function hentInnloggingsstatus(API_DEKORATOREN_URL: string): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<Data>(() => hentInnloggingsstatusFetch(API_DEKORATOREN_URL), {
        ok: hentInnloggingsstatusOk,
        feilet: hentnnloggingsstatusFeilet,
        pending: hentnnloggingsstatusPending,
    });
}

export function hentInnloggingsstatusOk(data: Data): HentInnloggingsstatusOKAction {
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
