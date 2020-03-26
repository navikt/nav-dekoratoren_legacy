// tslint:disable-line:no-any
import React from 'react';
import { Environment } from '../utils/Environment';
import { fetchToJson } from './api-utils';
import { Data as innloggingsstatusData } from '../reducer/innloggingsstatus-duck';
import { Data as varselinnboksData } from '../reducer/varselinnboks-duck';
import { MenyNode as menypunkterData } from '../reducer/menu-duck';

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

export const hentMenyPunkter = (): Promise<menypunkterData[]> =>
    fetchToJson(`${Environment().APP_BASE_URL}/api/meny`);

export const hentInnloggingsstatusFetch = (): Promise<innloggingsstatusData> =>
    fetchToJson(`${Environment().APP_BASE_URL}/api/auth`, {
        credentials: 'include',
    });

export const hentVarslerFetch = (): Promise<varselinnboksData> => {
    const tidspunkt = new Date().getTime();
    return fetchToJson(
        `${
            Environment().APP_BASE_URL
        }/api/varsler/varsler?noCache=${tidspunkt}&limit=5`
    );
};

export const lagreVarslerLestFetch = (nyesteId: number): Promise<number> =>
    fetchToJson(
        `${
            Environment().APP_BASE_URL
        }/api/varsler/rest/varsel/erles/${nyesteId}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nyesteId),
        }
    );
