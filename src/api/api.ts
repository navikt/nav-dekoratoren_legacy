import Environments from '../utils/Environments';
import { fetchToJson } from './fetch-utils';
import { Data as innloggingsstatusData } from '../redux/innloggingsstatus-duck';
import { Data as varselinnboksData } from '../redux/varselinnboks-duck';

const { baseUrl } = Environments();

interface ApiProps {
    innloggingsstatusURL: string;
    varselinnboksURL: string;
}

export const API: ApiProps = {
    innloggingsstatusURL: `${baseUrl}/innloggingslinje-api/auth`,
    varselinnboksURL: `${baseUrl}/person/varselinnboks/varsler`,
};

export function hentInnloggingsstatusFetch(): Promise<innloggingsstatusData> {
    return fetchToJson(API.innloggingsstatusURL);
}

export function hentVarslerFetch(): Promise<varselinnboksData> {
    return fetchToJson(API.varselinnboksURL);
}