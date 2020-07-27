import { fetchToJson } from './api-utils';
import { Data as innloggingsstatusData } from '../store/reducers/innloggingsstatus-duck';
import { VarslerData as varselinnboksData } from '../store/reducers/varselinnboks-duck';
import { MenyNode as menypunkterData } from '../store/reducers/menu-duck';
import { DriftsmeldingData } from '../store/reducers/driftsmelding-duck';

export enum Status {
    OK = 'OK',
    FEILET = 'FEILET',
    PENDING = 'PENDING',
    IKKE_STARTET = 'IKKE_STARTET',
    RELOADING = 'RELOADING',
}

export interface DataElement {
    status: Status;
}

export const hentMenyPunkter = (
    APP_BASE_URL: string
): Promise<menypunkterData[]> => fetchToJson(`${APP_BASE_URL}/api/meny`);

export const hentInnloggingsstatusFetch = (
    APP_BASE_URL: string
): Promise<innloggingsstatusData> =>
    fetchToJson(`${APP_BASE_URL}/api/auth`, {
        credentials: 'include',
    });

export const hentVarslerFetch = (
    APP_BASE_URL: string
): Promise<varselinnboksData> => {
    const tidspunkt = new Date().getTime();
    return fetchToJson(
        `${APP_BASE_URL}/api/varsler/varsler?noCache=${tidspunkt}&limit=5`,
        { credentials: 'include' }
    );
};

export const lagreVarslerLestFetch = (
    APP_BASE_URL: string,
    nyesteId: number
): Promise<number> =>
    fetchToJson(`${APP_BASE_URL}/api/varsler/rest/varsel/erlest/${nyesteId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nyesteId),
        credentials: 'include',
    });


export const hentDriftsmelding = (
    APP_BASE_URL: string
): Promise<DriftsmeldingData> => fetchToJson(`${APP_BASE_URL}/api/driftsmelding`);