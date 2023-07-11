import { fetchToJson } from './api-utils';
import {
    InnloggingsstatusData as InnloggingsstatusData,
    InnloggingsstatusState,
    SessionData,
} from '../store/reducers/innloggingsstatus-duck';
import { VarslerData as varselinnboksData } from '../store/reducers/varselinnboks-duck';
import { MenyNode as menypunkterData } from '../store/reducers/menu-duck';
import { DriftsmeldingerData } from 'store/reducers/driftsmeldinger-duck';
import { FeatureToggles } from 'store/reducers/feature-toggles-duck';
import { Environment } from 'store/reducers/environment-duck';

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

export const hentInnloggingsstatusFetch = (environment: Environment): Promise<InnloggingsstatusData & SessionData> => {
    const { API_DEKORATOREN_URL, SIDECAR_URL } = environment;
    console.log('hentInnloggingsstatusFetch');
    console.log(API_DEKORATOREN_URL);

    const innloggingsstatusResult: Promise<InnloggingsstatusData> = fetchToJson(`${API_DEKORATOREN_URL}/auth`, {
        credentials: 'include',
    });

    const sessionStatus: Promise<SessionData> = fetchToJson(`${SIDECAR_URL}/session`, {
        credentials: 'include',
    });

    const all: Promise<InnloggingsstatusData & SessionData> = Promise.all<any>([innloggingsstatusResult, sessionStatus])
        .then((values) => {
            const [innloggingsstatus, { session, tokens }] = values;
            return {
                ...innloggingsstatus,
                session: {
                    createdAt: session.created_at,
                    endsAt: session.ends_at,
                    timeoutAt: session.timeout_at,
                    isActive: session.active,
                },
                token: {
                    endsAt: tokens.expire_at,
                    refreshedAt: tokens.refreshed_at,
                    isRefreshCooldown: tokens.refresh_cooldown,
                },
            };
        })
        .catch((e) => {
            throw new Error(`Error fetching innloggingsstatus [error: ${e}]`);
        });

    return all;
};

export const fornyInnloggingFetch = (environment: Environment): Promise<SessionData> => {
    const { SIDECAR_URL } = environment;
    return fetchToJson(`${SIDECAR_URL}/session/refresh`, {
        credentials: 'include',
    }).then((values: any) => {
        return {
            session: {
                createdAt: values.created_at,
                endsAt: values.ends_at,
                timeoutAt: values.timeout_at,
                isActive: values.active,
            },
            token: {
                endsAt: values.expire_at,
                refreshedAt: values.refreshed_at,
                isRefreshCooldown: values.refresh_cooldown,
            },
        };
    });
};

export const hentVarslerFetch = (API_DEKORATOREN_URL: string): Promise<varselinnboksData> => {
    return fetchToJson(`${API_DEKORATOREN_URL}/varsel/proxy/varsel`, { credentials: 'include' });
};

export const postDone = (API_DEKORATOREN_URL: string, eventId: DoneEvent) =>
    fetch(`${API_DEKORATOREN_URL}/varsel/beskjed/done`, {
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
