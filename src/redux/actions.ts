import { Data } from './innloggingsstatus-duck';
import { Data as sokeData } from './soke-duck';

export enum ActionType {
    HENT_INNLOGGINGSSTATUS_OK = 'HENT_INNLOGGINGSSTATUS_OK',
    HENT_INNLOGGINGSSTATUS_FEILET = 'HENT_INNLOGGINGSSTATUS_FEILET',
    HENT_INNLOGGINGSSTATUS_PENDING = 'HENT_INNLOGGINGSSTATUS_PENDING',
    HENT_SOKERESULTAT_OK = 'HENT_SOKERESULTAT_OK',
    HENT_SOKERESULTAT_FEILET = 'HENT_SOKERESULTAT_FEILET',
    HENT_SOKERESULTAT_PENDING = 'HENT_SOKERESULTAT_PENDING',
}

export interface HentInnloggingsstatusOKAction {
    type: ActionType.HENT_INNLOGGINGSSTATUS_OK;
    data: Data;
}

export interface HentInnloggingsstatusPENDINGAction {
    type: ActionType.HENT_INNLOGGINGSSTATUS_PENDING;
}

export interface HentInnloggingsstatusFEILETAction {
    type: ActionType.HENT_INNLOGGINGSSTATUS_FEILET;
}

export interface HentSokeResultatOKAction {
    type: ActionType.HENT_SOKERESULTAT_OK;
    data: sokeData;
}

export interface HentSokeResultatPENDINGAction {
    type: ActionType.HENT_SOKERESULTAT_PENDING;
}

export interface HentSokeResultatFEILETAction {
    type: ActionType.HENT_SOKERESULTAT_FEILET;
}

export type Handling =
    | HentInnloggingsstatusOKAction
    | HentInnloggingsstatusFEILETAction
    | HentInnloggingsstatusPENDINGAction
    | HentSokeResultatOKAction
    | HentSokeResultatFEILETAction
    | HentSokeResultatPENDINGAction;
