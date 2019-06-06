import Environments from '../utils/Environments';
import { fetchToJson } from './fetch-utils';
import { Data } from '../redux/innloggingsstatus-duck';

const { baseUrl } = Environments();

interface ApiProps {
    innloggingsstatusURL: string;
}

export const API: ApiProps = {
    innloggingsstatusURL: `${baseUrl}/innloggingslinje-api/auth`,
};

export function hentInnloggingsstatusFetch(): Promise<Data> {
    return fetchToJson(API.innloggingsstatusURL);
}
