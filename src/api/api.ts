import React from 'react';
import Environments from '../utils/environments';
import { fetchToJson } from './api-utils';
import { Data as innloggingsstatusData } from '../reducer/innloggingsstatus-duck';
import { Data as varselinnboksData } from '../reducer/varselinnboks-duck';
import { Meny as menypunkterData } from '../reducer/menu-duck';

const { baseUrl, innloggingslinjenUrl, menypunkter, sokeresultat } = Environments();

export const varselinnboksUrl = `${baseUrl}/person/varselinnboks`;

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
    children: React.ReactElement<any>; // tslint:disable-line:no-any
    feilmeldingId?: string;
}

interface ApiProps {
    innloggingsstatusURL: string;
    menyPunkterURL: string;
    getVarselinnboksURL: string;
    postVarselinnboksURL: string;
    sokeresultat: string;
}

export const API: ApiProps = {
    innloggingsstatusURL: `${innloggingslinjenUrl}/innloggingslinje-api/auth`,
    menyPunkterURL: menypunkter,
    getVarselinnboksURL: `${varselinnboksUrl}/varsler`,
    postVarselinnboksURL: `${varselinnboksUrl}/rest/varsel/erlest`,
    sokeresultat: sokeresultat,
};

export function hentInnloggingsstatusFetch(): Promise<innloggingsstatusData> {
    return fetchToJson(API.innloggingsstatusURL,  { credentials: 'include' });
}

export function hentMenyPunkter(): Promise<menypunkterData[]> {
    return fetchToJson(API.menyPunkterURL);
}

export function hentVarslerFetch(): Promise<varselinnboksData> {
    const tidspunkt = new Date().getTime();
    const queryParams = `?noCache=${tidspunkt}&limit=5`;
    return fetchToJson(API.getVarselinnboksURL + queryParams);
}

export function lagreVarslerLestFetch(nyesteId: number): Promise<number> {
    const config = {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(nyesteId),
    };
    return fetchToJson(`${API.postVarselinnboksURL}/${nyesteId}`, config);
}
