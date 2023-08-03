import { fetchToJson, getAuthUrl } from './api-utils';
import { InnloggingsstatusData as InnloggingsstatusData, SessionData } from '../store/reducers/innloggingsstatus-duck';
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
    const { API_DEKORATOREN_URL } = environment;
    const sessionUrl = getAuthUrl('/oauth2/session');

    //const appUrl = APP_BASE_URL.includes('localhost') ? `${APP_BASE_URL}/api` : APP_BASE_URL;

    const innloggingsstatusResult: Promise<InnloggingsstatusData> = fetchToJson(`${API_DEKORATOREN_URL}/auth`, {
        credentials: 'include',
    });

    const sessionStatus: Promise<SessionData> = fetchToJson(sessionUrl, {
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
    const { APP_BASE_URL } = environment;
    const appUrl = APP_BASE_URL.includes('localhost') ? `${APP_BASE_URL}/api` : APP_BASE_URL;
    return fetchToJson(`${appUrl}/oauth2/session/refresh`, {
        credentials: 'include',
    }).then((values: any) => {
        return {
            session: {
                createdAt: values.session.created_at,
                endsAt: values.session.ends_at,
                timeoutAt: values.session.timeout_at,
                isActive: values.session.active,
            },
            token: {
                endsAt: values.tokens.expire_at,
                refreshedAt: values.tokens.refreshed_at,
                isRefreshCooldown: values.tokens.refresh_cooldown,
            },
        };
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
