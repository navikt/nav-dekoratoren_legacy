import Environments from '../utils/Environments';
import { fetchToJson } from './api-utils';
import { Data as innloggingsstatusData } from '../reducer/innloggingsstatus-duck';
import { Data as varselinnboksData } from '../reducer/varselinnboks-duck';

const { baseUrl, menypunkter } = Environments();

export const varselinnboksUrl = `${baseUrl}/person/varselinnboks`;

interface ApiProps {
    innloggingsstatusURL: string;
    menyPunkterURL: string;
    getVarselinnboksURL: string;
    postVarselinnboksURL: string;
}

export const API: ApiProps = {
    innloggingsstatusURL: `${baseUrl}/innloggingslinje-api/auth`,
    menyPunkterURL: menypunkter,
    getVarselinnboksURL: `${varselinnboksUrl}/varsler`,
    postVarselinnboksURL: `${varselinnboksUrl}/rest/varsel/erlest`,
};

export function hentInnloggingsstatusFetch(): Promise<innloggingsstatusData> {
    return fetchToJson(API.innloggingsstatusURL);
}

export function hentMenyPunkter(): Promise<Array<object>> {
    return fetchToJson(API.menyPunkterURL);
}

export function hentVarslerFetch(): Promise<varselinnboksData> {
    const tidspunkt = new Date().getTime();
    const queryParams = `?noCache=${tidspunkt}&limit=5`;
    return fetchToJson(API.getVarselinnboksURL + queryParams);
}

export function lagreVarslerLestFetch(nyesteId: number): Promise<number> {
    const config = {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(nyesteId),
    };
    return fetchToJson(`${API.postVarselinnboksURL}/${nyesteId}`, config);
}
