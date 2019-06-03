import { Handling } from '../redux/actions';
import { Dispatch } from '../redux/dispatch-type';

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
            handterFeil(dispatch, feilet)(e);
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

export async function fetchToJson<T>(url: string, config: RequestInit): Promise<T> {
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