import { fetchToJson } from './api-utils';
import { Data as innloggingsstatusData } from '../store/reducers/innloggingsstatus-duck';
import { VarslerData as varselinnboksData } from '../store/reducers/varselinnboks-duck';
import { MenyNode as menypunkterData } from '../store/reducers/menu-duck';
import { DriftsmeldingerData } from 'store/reducers/driftsmeldinger-duck';
import { FeatureToggles } from 'store/reducers/feature-toggles-duck';

type DoneEvent = {
    eventId: string;
};

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

export const hentMenyPunkter = (APP_URL: string): Promise<menypunkterData[]> => fetchToJson(`${APP_URL}/api/meny`);

export const hentInnloggingsstatusFetch = (API_DEKORATOREN_URL: string): Promise<innloggingsstatusData> =>
    fetchToJson(`${API_DEKORATOREN_URL}/auth`, {
        credentials: 'include',
    });

export const hentVarslerFetch = (VARSEL_API_URL: string): Promise<varselinnboksData> => {
    return fetchToJson(`${VARSEL_API_URL}/varselbjelle/varsler`, { credentials: 'include' });
};

export const postInaktiver = (VARSEL_API_URL: string, eventId: DoneEvent) =>
    fetch(`${VARSEL_API_URL}/beskjed/inaktiver`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventId),
        credentials: 'include',
        keepalive: true,
    }).catch((e) => console.info(`Error posting done event for varsler [eventId: ${eventId?.eventId} - error: ${e}]`));

export const fetchFeatureToggles = (API_DEKORATOREN_URL: string, featureToggles: FeatureToggles) =>
    fetchToJson(`${API_DEKORATOREN_URL}/feature-toggles${getFeatureToggleUrl(featureToggles)}`, {
        credentials: 'include',
    });

export const getFeatureToggleUrl = (featureToggles: FeatureToggles) =>
    Object.keys(featureToggles)
        .map((feature: string, i: number) => `${!i ? `?` : ``}feature=${feature}`)
        .join('&');

export const hentDriftsmeldinger = (APP_URL: string): Promise<DriftsmeldingerData[]> =>
    fetchToJson(`${APP_URL}/api/driftsmeldinger`);
