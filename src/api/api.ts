import { fetchToJson } from './fetch-utils';
import { Data } from '../redux/innloggingsstatus-duck';

interface ApiProps {
    innloggingsstatusURL: string;
}

export const API: ApiProps = {
    innloggingsstatusURL: 'https://www-q0.nav.no/innloggingslinje-api/auth',
};

export function hentInnloggingsstatusFetch(): Promise<Data> {
    return fetchToJson(API.innloggingsstatusURL);
}
