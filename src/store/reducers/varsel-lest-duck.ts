import { ActionType } from 'store/actions';
import { Handling } from 'store/actions';
import { SettVarslerLestFEILETAction } from 'store/actions';
import { SettVarslerLestPENDINGAction } from 'store/actions';
import { SettVarslerLestOKAction } from 'store/actions';
import { Dispatch } from 'store/dispatch-type';
import { fetchThenDispatch } from 'api/api-utils';
import { lagreVarslerLestFetch } from 'api/api';
import { DataElement, Status } from 'api/api';
import { settVarslerLest } from './varselinnboks-duck';

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
    nyesteId: number,
    dispatch: Dispatch
) {
    dispatch(settVarslerLest());
    fetchThenDispatch<number>(
        () => lagreVarslerLestFetch(APP_BASE_URL, nyesteId),
        {
            ok: settVarslerLestOk,
            feilet: settVarslerLestFeilet,
            pending: settVarslerLestPending,
        }
    )(dispatch);
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
