import { ActionType } from 'state/actions';
import { Handling } from 'state/actions';
import { SettVarslerLestFEILETAction } from 'state/actions';
import { SettVarslerLestPENDINGAction } from 'state/actions';
import { SettVarslerLestOKAction } from 'state/actions';
import { Dispatch } from 'state/dispatch-type';
import { fetchThenDispatch } from 'api/api-utils';
import { lagreVarslerLestFetch } from 'api/api';
import { DataElement, Status } from 'api/api';

export const initialLestMeldingState: DataElement = {
    status: Status.IKKE_STARTET,
};

//  Reducer
export default function reducer(
    state: DataElement = initialLestMeldingState,
    action: Handling
): DataElement {
    switch (action.type) {
        case ActionType.SETT_VARSLER_LEST_OK:
            return { ...state, status: Status.OK };
        case ActionType.SETT_VARSLER_LEST_PENDING:
            return { ...state, status: Status.PENDING };
        case ActionType.SETT_VARSLER_LEST_FEILET:
            return { ...state, status: Status.FEILET };
        default:
            return state;
    }
}

export function settVarslerSomLest(
    APP_BASE_URL: string,
    nyesteId: number
): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<number>(
        () => lagreVarslerLestFetch(APP_BASE_URL, nyesteId),
        {
            ok: settVarslerLestOk,
            feilet: settVarslerLestFeilet,
            pending: settVarslerLestPending,
        }
    );
}

function settVarslerLestOk(nyesteId: number): SettVarslerLestOKAction {
    return {
        type: ActionType.SETT_VARSLER_LEST_OK,
        nyesteId,
    };
}

function settVarslerLestFeilet(): SettVarslerLestFEILETAction {
    return {
        type: ActionType.SETT_VARSLER_LEST_FEILET,
    };
}

function settVarslerLestPending(): SettVarslerLestPENDINGAction {
    return {
        type: ActionType.SETT_VARSLER_LEST_PENDING,
    };
}
