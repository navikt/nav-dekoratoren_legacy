import {
    ActionType,
    Handling,
    HentInnloggingsstatusFEILETAction,
    HentInnloggingsstatusOKAction,
    HentInnloggingsstatusPENDINGAction,
} from '../redux/actions';
import { Dispatch } from '../redux/dispatch-type';
import { fetchThenDispatch } from '../api/api-utils';
import { hentInnloggingsstatusFetch } from '../api/api';
import { DataElement, Status } from '../api/api';

export interface InnloggingsstatusState extends DataElement {
    data: Data;
}

export interface Data {
    authenticated: boolean;
    name: string;
    securityLevel: string;
}

const initialState: InnloggingsstatusState = {
    data: {
        authenticated: false,
        name: '',
        securityLevel: '',
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

export function hentInnloggingsstatus(
    APP_BASE_URL: string
): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<Data>(
        () => hentInnloggingsstatusFetch(APP_BASE_URL),
        {
            ok: hentInnloggingsstatusOk,
            feilet: hentnnloggingsstatusFeilet,
            pending: hentnnloggingsstatusPending,
        }
    );
}

function hentInnloggingsstatusOk(data: Data): HentInnloggingsstatusOKAction {
    return {
        type: ActionType.HENT_INNLOGGINGSSTATUS_OK,
        data: data,
    };
}

function hentnnloggingsstatusFeilet(): HentInnloggingsstatusFEILETAction {
    return {
        type: ActionType.HENT_INNLOGGINGSSTATUS_FEILET,
    };
}

function hentnnloggingsstatusPending(): HentInnloggingsstatusPENDINGAction {
    return {
        type: ActionType.HENT_INNLOGGINGSSTATUS_PENDING,
    };
}
