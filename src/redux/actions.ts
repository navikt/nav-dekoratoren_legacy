import { Data as innloggingsstatusData } from '../reducer/innloggingsstatus-duck';
import { Data as varselinnboksData } from '../reducer/varselinnboks-duck';
import { MenyNode as menypunkterData } from '../reducer/menu-duck';

export enum ActionType {
    HENT_INNLOGGINGSSTATUS_OK = 'HENT_INNLOGGINGSSTATUS_OK',
    HENT_INNLOGGINGSSTATUS_FEILET = 'HENT_INNLOGGINGSSTATUS_FEILET',
    HENT_INNLOGGINGSSTATUS_PENDING = 'HENT_INNLOGGINGSSTATUS_PENDING',
    HENT_MENY_OK = 'HENT_MENY_OK',
    HENT_MENY_FEILET = 'HENT_MENY_FEILET',
    HENT_MENY_PENDING = 'HENT_MENY_PENDING',
    HENT_VARSLER_OK = 'HENT_VARSLER_OK',
    HENT_VARSLER_FEILET = 'HENT_VARSLER_FEILET',
    HENT_VARSLER_PENDING = 'HENT_VARSLER_PENDING',
    SETT_VARSLER_OK = 'SETT_VARSLER_OK',
    SETT_VARSLER_LEST_OK = 'SETT_VARSLER_LEST_OK',
    SETT_VARSLER_LEST_FEILET = 'SETT_VARSLER_LEST_FEILET',
    SETT_VARSLER_LEST_PENDING = 'SETT_VARSLER_LEST_PENDING',
    SETT_LANGUAGE = 'SETT_LANGUAGE',
    PRIVATPERSON = 'PRIVATPERSON',
    ARBEIDSGIVER = 'ARBEIDSGIVER',
    SAMARBEIDSPARTNER = 'SAMARBEIDSPARTNER',
    IKKEVALGT = 'IKKEVALGT',
    TOGGLE_HOVEDMENY = 'TOGGLE_HOVEDMENY',
    TOGGLE_MINSIDE_MENY = 'TOGGLE_MINSIDE_MENY',
    TOGGLE_SOK = 'TOGGLE_SOK',
    TOGGLE_VARSLER = 'TOGGLE_VARSLER',
    TOGGLE_LUKK_ALLE = 'TOGGLE_LUKK_ALLE',
    TOGGLE_VARSEL = 'TOGGLE_VARSEL',
    TOGGLE_UNDERMENY = 'TOGGLE_UNDERMENY',
    TOGGLE_HOVEDOGUNDERMENY = 'TOGGLE_HOVEDOGUNDERMENY',
}

export interface HentInnloggingsstatusOKAction {
    type: ActionType.HENT_INNLOGGINGSSTATUS_OK;
    data: innloggingsstatusData;
}

export interface HentInnloggingsstatusPENDINGAction {
    type: ActionType.HENT_INNLOGGINGSSTATUS_PENDING;
}

export interface HentInnloggingsstatusFEILETAction {
    type: ActionType.HENT_INNLOGGINGSSTATUS_FEILET;
}

export interface HentMenyLenkerSUCCESS {
    type: ActionType.HENT_MENY_OK;
    data: menypunkterData[];
}

export interface HentMenyLenkerPENDING {
    type: ActionType.HENT_MENY_PENDING;
}

export interface HentMenyLenkerFAILED {
    type: ActionType.HENT_MENY_FEILET;
}

export interface HentVarslerOKAction {
    type: ActionType.HENT_VARSLER_OK;
    data: varselinnboksData;
}

export interface HentVarslerPENDINGAction {
    type: ActionType.HENT_VARSLER_PENDING;
}

export interface HentVarslerFEILETAction {
    type: ActionType.HENT_VARSLER_FEILET;
}

export interface SettVarslerOKAction {
    type: ActionType.SETT_VARSLER_OK;
}

export interface SettVarslerLestOKAction {
    type: ActionType.SETT_VARSLER_LEST_OK;
    nyesteId: number;
}

export interface SettVarslerLestPENDINGAction {
    type: ActionType.SETT_VARSLER_LEST_PENDING;
}

export interface SettVarslerLestFEILETAction {
    type: ActionType.SETT_VARSLER_LEST_FEILET;
}

export interface SettPrivatpersonAction {
    type: ActionType.PRIVATPERSON;
}

export interface SettArbeidsgiverAction {
    type: ActionType.ARBEIDSGIVER;
}

export interface SettSamarbeidspartnerAction {
    type: ActionType.SAMARBEIDSPARTNER;
}

export interface SettArbeidsflateIkkeValgt {
    type: ActionType.IKKEVALGT;
}

export interface ToggleHovedmeny {
    type: ActionType.TOGGLE_HOVEDMENY;
}

export interface ToggleMinsideMeny {
    type: ActionType.TOGGLE_MINSIDE_MENY;
}

export interface ToggleUnderMeny {
    type: ActionType.TOGGLE_UNDERMENY;
}

export interface ToggleHovedOgUnderMeny {
    type: ActionType.TOGGLE_HOVEDOGUNDERMENY;
}

export interface ToggleSok {
    type: ActionType.TOGGLE_SOK;
}

export interface ToggleVarsler {
    type: ActionType.TOGGLE_VARSLER;
}

export interface ToggleVarsel {
    type: ActionType.TOGGLE_VARSEL;
}

export interface ToggleLukkAlle {
    type: ActionType.TOGGLE_LUKK_ALLE;
}

export type Handling =
    | HentInnloggingsstatusOKAction
    | HentInnloggingsstatusFEILETAction
    | HentInnloggingsstatusPENDINGAction
    | HentMenyLenkerSUCCESS
    | HentMenyLenkerFAILED
    | HentMenyLenkerPENDING
    | HentVarslerOKAction
    | HentVarslerFEILETAction
    | HentVarslerPENDINGAction
    | SettVarslerOKAction
    | SettVarslerLestOKAction
    | SettVarslerLestFEILETAction
    | SettVarslerLestPENDINGAction
    | SettPrivatpersonAction
    | SettArbeidsgiverAction
    | SettSamarbeidspartnerAction
    | SettArbeidsflateIkkeValgt
    | ToggleHovedmeny
    | ToggleMinsideMeny
    | ToggleSok
    | ToggleLukkAlle
    | ToggleVarsel
    | ToggleUnderMeny
    | ToggleHovedOgUnderMeny
    | ToggleVarsler
    | ToggleLukkAlle;
