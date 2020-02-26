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
    return fetchToJson(Environment.API_INNLOGGINGSLINJE_URL, {
        credentials: 'include',
    });
}

export function hentMenyPunkter(): Promise<menypunkterData[]> {
    return fetchToJson(Environment.BACKEND_MENY_URL);
}

export function hentVarslerFetch(): Promise<varselinnboksData> {
    const tidspunkt = new Date().getTime();
    const queryParams = `?noCache=${tidspunkt}&limit=5`;
    return fetchToJson(
        `${Environment.API_VARSELINNBOKS_URL}/varsler${queryParams}`
    );
}

export function lagreVarslerLestFetch(nyesteId: number): Promise<number> {
    const config = {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(nyesteId),
    };
    return fetchToJson(
        `${Environment.API_VARSELINNBOKS_URL}/rest/varsel/erles/${nyesteId}`,
        config
    );
}
