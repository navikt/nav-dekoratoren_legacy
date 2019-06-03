import { fetchToJson } from './fetch-utils';
import { Data } from '../ducks/innloggingsstatus';

const getCookie = (name: string) => {
    const re = new RegExp(`${name}=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
};

const requestConfig: RequestInit = {
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
        'NAV_CSRF_PROTECTION': getCookie('NAV_CSRF_PROTECTION'),
    }
};

interface ApiProps {
    innloggingsstatusURL: string;
}

export const API: ApiProps = {
    innloggingsstatusURL: 'https://nav.no/innloggingslinje-api/auth'
};

export function hentInnloggingsstatusFetch(): Promise<Data> {
    return fetchToJson(API.innloggingsstatusURL, requestConfig);
}
