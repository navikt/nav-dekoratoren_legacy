import { ActionType } from 'store/actions';
import { Handling } from 'store/actions';
import { SettTilbakemeldingFEILETAction } from 'store/actions';
import { SettTilbakemeldingPENDINGAction } from 'store/actions';
//  Reducer
export function lagreTilbakemelding(
    feedback: Object,
    FEEDBACK_API_URL: string
) {
    fetchThenDispatch<number>(() => lagreTilbakemeldingFetch(FEEDBACK_API_URL, feedback), {
        ok: settTilbakemeldingOk,
        feilet: settTilbakemeldingFeilet,
        pending: settTilbakemeldingPending,
    });
}
import { SettTilbakemeldingOKAction } from 'store/actions';
import { Dispatch } from 'store/dispatch-type';
import { fetchThenDispatch } from 'api/api-utils';
import { lagreTilbakemeldingFetch } from 'api/api';

import { DataElement, Status } from 'api/api';

export const initialLestMeldingState: DataElement = {
    status: Status.IKKE_STARTET,
};

export default function reducer(
    state: DataElement = initialLestMeldingState,
    action: Handling
): DataElement {
    switch (action.type) {
        case ActionType.SETT_TILBAKEMELDING_OK:
            return { ...state, status: Status.OK };
        case ActionType.SETT_TILBAKEMELDING_PENDING:
            return { ...state, status: Status.PENDING };
        case ActionType.SETT_TILBAKEMELDING_FEILET:
            return { ...state, status: Status.FEILET };
        default:
            return state;
    }
}

function settTilbakemeldingOk(): SettTilbakemeldingOKAction {
    return {
        type: ActionType.SETT_TILBAKEMELDING_OK,
    };
}

function settTilbakemeldingFeilet(): SettTilbakemeldingFEILETAction {
    return {
        type: ActionType.SETT_TILBAKEMELDING_FEILET,
    };
}

function settTilbakemeldingPending(): SettTilbakemeldingPENDINGAction {
    return {
        type: ActionType.SETT_TILBAKEMELDING_PENDING,
    };
}
