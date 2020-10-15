import { ActionType } from 'store/actions';
import { Handling } from 'store/actions';
import { SettTilbakemeldingFEILETAction } from 'store/actions';
import { SettTilbakemeldingPENDINGAction } from 'store/actions';
import { SettTilbakemeldingOKAction } from 'store/actions';
import { fetchThenDispatch } from 'api/api-utils';
import { lagreTilbakemeldingFetch } from 'api/api';
import { DataElement, Status } from 'api/api';

export const initalState: DataElement = {
    status: Status.IKKE_STARTET,
};

export interface TilbakemeldingType {
    response: string;
    responseId: string;
    sessionId: string;
    message: string;
    urlPath: string;
    urlHost: string;
    browser: string;
    os: string;
    platform: string;
    browserLanguage: string;
    languageCode: string;
}

export default function reducer(state: DataElement = initalState, action: Handling): DataElement {
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

export function lagreTilbakemelding(feedback: Object, FEEDBACK_API_URL: string) {
    return fetchThenDispatch<number>(() => lagreTilbakemeldingFetch(feedback, FEEDBACK_API_URL), {
        ok: settTilbakemeldingOk,
        feilet: settTilbakemeldingFeilet,
        pending: settTilbakemeldingPending,
    });
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
