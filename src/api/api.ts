import Environments from '../utils/Environments';
import { fetchToJson } from './fetch-utils';
import { Data as innloggingsstatusData } from '../redux/innloggingsstatus-duck';
import { Data as varselinnboksData } from '../redux/varselinnboks-duck';
const { baseUrl } = Environments();

export const varselinnboksUrl = `${baseUrl}/person/varselinnboks`;

interface ApiProps {
    innloggingsstatusURL: string;
    getVarselinnboksURL: string;
    postVarselinnboksURL: string;
}

export const API: ApiProps = {
    innloggingsstatusURL: `${baseUrl}/innloggingslinje-api/auth`,
    getVarselinnboksURL: `${varselinnboksUrl}/varsler`,
    postVarselinnboksURL: `${varselinnboksUrl}/rest/varsel/erlest`,
};

export function hentInnloggingsstatusFetch(): Promise<innloggingsstatusData> {
    return fetchToJson(API.innloggingsstatusURL);
}

export function hentVarslerFetch(): Promise<varselinnboksData> {
    return fetchToJson(API.getVarselinnboksURL);
}

export function lagreVarslerLestFetch(nyesteId: number): Promise<number> {
    const config = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(nyesteId)
    };
    return fetchToJson(`${API.postVarselinnboksURL}/${nyesteId}`, config);
}
