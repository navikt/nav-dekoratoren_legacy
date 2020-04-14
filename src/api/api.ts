// tslint:disable-line:no-any
import React from 'react';
import { fetchToJson } from './api-utils';
import { Data as innloggingsstatusData } from '../reducers/innloggingsstatus-duck';
import { Data as varselinnboksData } from '../reducers/varselinnboks-duck';
import { MenyNode as menypunkterData } from '../reducers/menu-duck';

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

export interface DatalasterProps {
    avhengigheter: DataElement[];
    ventPa?: DataElement[];
    children: React.ReactElement<any>;
    feilmeldingId?: string;
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
        `${APP_BASE_URL}/api/varsler/varsler?noCache=${tidspunkt}&limit=5`
    );
};

export const lagreVarslerLestFetch = (
    APP_BASE_URL: string,
    nyesteId: number
): Promise<number> =>
    fetchToJson(`${APP_BASE_URL}/api/varsler/rest/varsel/erles/${nyesteId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nyesteId),
    });
