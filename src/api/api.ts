import { adaptFulfilledAuthDataFromAPI, adaptFulfilledSessionDataFromAPI, fetchToJson } from './api-utils';
import { InnloggingsstatusData as InnloggingsstatusData, SessionData } from '../store/reducers/innloggingsstatus-duck';
import { VarslerData as varselinnboksData } from '../store/reducers/varselinnboks-duck';
import { MenyNode as menypunkterData } from '../store/reducers/menu-duck';
import { DriftsmeldingerData } from 'store/reducers/driftsmeldinger-duck';
import { FeatureToggles } from 'store/reducers/feature-toggles-duck';
import { Environment } from 'store/reducers/environment-duck';
import { FulfilledValues } from 'types/auth';

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

type Result = {
    status: 'fulfilled' | 'rejected';
    value?: any;
};

export const hentMenyPunkter = (APP_URL: string): Promise<menypunkterData[]> => fetchToJson(`${APP_URL}/api/meny`);

export const hentInnloggingsstatusFetch = (environment: Environment): Promise<InnloggingsstatusData & SessionData> => {
    const { API_DEKORATOREN_URL, PARAMS } = environment;
    const { SIDECAR_BASE } = PARAMS;

    const sessionUrl = SIDECAR_BASE && `${SIDECAR_BASE}/oauth2/session`;

    const innloggingsstatusResult: Promise<InnloggingsstatusData> = fetchToJson(`${API_DEKORATOREN_URL}/auth`, {
        credentials: 'include',
    });

    const sessionStatus: Promise<SessionData> | null = sessionUrl
        ? fetchToJson(sessionUrl, {
              credentials: 'include',
          })
        : null;

    const all: Promise<InnloggingsstatusData & SessionData> = Promise.allSettled<any[]>([
        innloggingsstatusResult,
        sessionStatus,
    ])
        .then((results) => {
            const fulfilled = results.filter((result) => result.status === 'fulfilled');
            const fulfilledValues: FulfilledValues = fulfilled.reduce((acc, result: Result) => {
                result.value = result.value || {};
                return { ...acc, ...result.value };
            }, {});

            return adaptFulfilledAuthDataFromAPI(fulfilledValues);
        })
        .catch((e) => {
            throw new Error(`Error fetching innloggingsstatus [error: ${e}]`);
        });

    return all;
};

export const fornyInnloggingFetch = (environment: Environment): Promise<SessionData> => {
    const { PARAMS } = environment;
    const { SIDECAR_BASE } = PARAMS;

    if (!SIDECAR_BASE) {
        throw new Error('No sidecarBase is set as decorator param');
    }
    const refreshUrl = `${SIDECAR_BASE}/oauth2/session/refresh`;

    return fetchToJson(refreshUrl, {
        credentials: 'include',
    }).then((result: any) => {
        return adaptFulfilledSessionDataFromAPI(result);
    });
};

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
