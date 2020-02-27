// tslint:disable-line:no-any
import React from 'react';
import Environment from '../utils/Environment';
import { fetchToJson } from './api-utils';
import { Data as innloggingsstatusData } from '../reducer/innloggingsstatus-duck';
import { Data as varselinnboksData } from '../reducer/varselinnboks-duck';
import { Meny as menypunkterData } from '../reducer/menu-duck';

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

export function hentInnloggingsstatusFetch(): Promise<innloggingsstatusData> {
    return fetchToJson(`${Environment.APP_BASE_URL}/api/auth`, {
        credentials: 'include',
    });
}

export function hentMenyPunkter(): Promise<menypunkterData[]> {
    return fetchToJson(`${Environment.APP_BASE_URL}/api/meny`);
}

export function hentVarslerFetch(): Promise<varselinnboksData> {
    const tidspunkt = new Date().getTime();
    return fetchToJson(
        `${Environment.APP_BASE_URL}/api/varsler?noCache=${tidspunkt}&limit=5`
    );
}

export function lagreVarslerLestFetch(nyesteId: number): Promise<number> {
    return fetchToJson(
        `${Environment.APP_BASE_URL}/api/varsler/rest/varsel/erles/${nyesteId}`,
        {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(nyesteId),
        }
    );
}
