import { ReactElement } from 'react';
import { ActionType } from 'store/actions';
import { Handling } from 'store/actions';
import { HentDriftsmeldingFAILED } from 'store/actions';
import { HentDriftsmeldingSUCCESS } from 'store/actions';
import { HentDriftsmeldingPENDING } from 'store/actions';
import { Dispatch } from 'store/dispatch-type';
import { fetchThenDispatch } from 'api/api-utils';
import { hentDriftsmelding, DataElement, Status } from 'api/api';

export interface DriftsmeldingState extends DataElement {
    data: DriftsmeldingData;
}

export interface DriftsmeldingData {
    heading: string,
    url: string,
    icon?: ReactElement,
}


export const dataInitState: DriftsmeldingData = {
    heading: '',
    url: '',
    icon: undefined,
};

const initalState: DriftsmeldingState = {
    data: dataInitState,
    status: Status.IKKE_STARTET,
};

export default function reducer(
    state: DriftsmeldingState = initalState,
    action: Handling
): DriftsmeldingState {
    switch (action.type) {
        case ActionType.HENT_DRIFTSMELDING_OK: {
            console.log('menydata', action.data)
            return { ...state, status: Status.OK, data: action.data };
        }
        case ActionType.HENT_DRIFTSMELDING_PENDING:
            if (state.status === Status.OK) {
                return { ...state, status: Status.RELOADING };
            }
            return { ...state, status: Status.PENDING };
        case ActionType.HENT_DRIFTSMELDING_FEILET: {
            return { ...state, status: Status.FEILET };
        }
        default:
            return state;
    }
}

export function fetchDriftsmelding(
    APP_BASE_URL: string
) {
    return fetchThenDispatch<DriftsmeldingData>(() => hentDriftsmelding(APP_BASE_URL), {
        ok: driftsmeldingSuksess,
        feilet: driftsmeldingFeilet,
        pending: driftsmeldingPending,
    });
}

function driftsmeldingSuksess(data: DriftsmeldingData): HentDriftsmeldingSUCCESS {
    return {
        type: ActionType.HENT_DRIFTSMELDING_OK,
        data: data,
    };
}

function driftsmeldingPending(): HentDriftsmeldingPENDING {
    return {
        type: ActionType.HENT_DRIFTSMELDING_PENDING,
    };
}

function driftsmeldingFeilet(): HentDriftsmeldingFAILED {
    return {
        type: ActionType.HENT_DRIFTSMELDING_FEILET,
    };
}
