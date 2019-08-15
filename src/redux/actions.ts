import { Data } from './innloggingsstatus';
import { Data as MenuData } from './menuReducer';

export enum ActionType {
    HENT_INNLOGGINGSSTATUS_OK = 'HENT_INNLOGGINGSSTATUS_OK',
    HENT_INNLOGGINGSSTATUS_FEILET = 'HENT_INNLOGGINGSSTATUS_FEILET',
    HENT_INNLOGGINGSSTATUS_PENDING = 'HENT_INNLOGGINGSSTATUS_PENDING',
    HENT_MENY_OK = 'HENT_MENY_OK',
    HENT_MENY_FEILET = 'HENT_MENY_FEILET',
    HENT_MENY_PENDING = 'HENT_MENY_PENDING',
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

export interface HentMenyLenkerSUCCESS {
    type: ActionType.HENT_MENY_OK;
    data: Array<object>;
}

export interface HentMenyLenkerPENDING {
    type: ActionType.HENT_MENY_PENDING;
}

export interface HentMenyLenkerFAILED {
    type: ActionType.HENT_MENY_FEILET;
}

export type Handling =
    | HentInnloggingsstatusOKAction
    | HentInnloggingsstatusFEILETAction
    | HentInnloggingsstatusPENDINGAction
    | HentMenyLenkerSUCCESS
    | HentMenyLenkerFAILED
    | HentMenyLenkerPENDING;
