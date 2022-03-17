import { ActionType } from 'store/actions';
import { Handling } from 'store/actions';
import { HentDriftsmeldingFAILED } from 'store/actions';
import { HentDriftsmeldingSUCCESS } from 'store/actions';
import { HentDriftsmeldingPENDING } from 'store/actions';
import { Dispatch } from 'store/dispatch-type';
import { fetchThenDispatch } from 'api/api-utils';
import { hentDriftsmeldinger, DataElement, Status } from 'api/api';

export interface DriftsmeldingerState extends DataElement {
    data: DriftsmeldingerData[];
}

export interface DriftsmeldingerData {
    heading: string;
    url: string;
    type: string;
    urlscope: string[];
}

const initalState: DriftsmeldingerState = {
    data: [],
    status: Status.IKKE_STARTET,
};

export default function reducer(state: DriftsmeldingerState = initalState, action: Handling): DriftsmeldingerState {
    switch (action.type) {
        case ActionType.HENT_DRIFTSMELDING_OK: {
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

export function fetchDriftsmeldinger(APP_URL: string): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<DriftsmeldingerData[]>(() => hentDriftsmeldinger(APP_URL), {
        ok: driftsmeldingSuksess,
        feilet: driftsmeldingFeilet,
        pending: driftsmeldingPending,
    });
}

function driftsmeldingSuksess(data: DriftsmeldingerData[]): HentDriftsmeldingSUCCESS {
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
