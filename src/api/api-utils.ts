import { Handling } from 'store/actions';
import { Dispatch } from 'store/dispatch-type';
import { InnloggingsstatusData, SessionData } from 'store/reducers/innloggingsstatus-duck';
import { FulfilledValues, RawResolvedSessionData } from 'types/auth';

interface StatusActions<T> {
    ok: (temaer: T) => Handling;
    feilet: () => Handling;
    pending: () => Handling;
}

export function fetchThenDispatch<T>(
    fetchFunction: () => Promise<T>,
    { ok, feilet, pending }: StatusActions<T>
): (dispatch: Dispatch) => Promise<void> {
    return async (dispatch: Dispatch): Promise<void> => {
        dispatch(pending());
        try {
            const data = await fetchFunction();
            sendResultatTilDispatch<T>(dispatch, ok)(data);
        } catch (e) {
            handterFeil(dispatch, feilet)(e as FetchError);
        }
    };
}

function sendResultatTilDispatch<T>(dispatch: Dispatch, okAction: (temaer: T) => Handling): (jsonData: T) => void {
    return (jsonData: T) => {
        dispatch(okAction(jsonData));
    };
}

function handterFeil(dispatch: Dispatch, feiletAction: () => Handling): (error: FetchError) => void {
    return (error: FetchError) => {
        if (error.response) {
            error.response.text().then(() => {
                dispatch(feiletAction());
            });
        } else {
            dispatch(feiletAction());
        }
    };
}

export async function fetchToJson<T>(url: string, config?: RequestInit): Promise<T> {
    const respons = await fetch(url, config);
    const gyldigRespons = sjekkStatuskode(respons);
    return await toJson<T>(gyldigRespons);
}

class FetchError extends Error {
    public response: Response;

    constructor(reason: string, response: Response) {
        super(reason);
        this.response = response;
    }
}

function sjekkStatuskode(response: Response): Response {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    throw new FetchError(response.statusText || response.type, response);
}

function toJson<T>(response: Response): Promise<T> {
    return response.json();
}

export const adaptFulfilledSessionDataFromAPI = (sessionData: RawResolvedSessionData): SessionData => {
    const { session, tokens } = sessionData;
    return {
        session: {
            createdAt: session?.created_at || null,
            endsAt: session?.ends_at || null,
            timeoutAt: session?.timeout_at || null,
            isActive: session?.active || false,
        },
        token: {
            endsAt: tokens?.expire_at || null,
            refreshedAt: tokens?.refreshed_at || null,
            isRefreshCooldown: tokens?.refresh_cooldown || false,
        },
    };
};

export const adaptFulfilledAuthDataFromAPI = (
    fulfilledValues: FulfilledValues
): InnloggingsstatusData & SessionData => {
    const { authenticated = false, name = '', securityLevel = '' } = fulfilledValues;
    const { session, tokens } = fulfilledValues;

    return {
        authenticated,
        name,
        securityLevel,
        ...adaptFulfilledSessionDataFromAPI({ session, tokens }),
    };
};
