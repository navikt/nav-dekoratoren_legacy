import { SessionData, InnloggingsstatusData } from './reducers/innloggingsstatus-duck';
import { VarslerData as varselinnboksData } from './reducers/varselinnboks-duck';
import { MenyNode as menypunkterData } from './reducers/menu-duck';
import { DriftsmeldingerData } from './reducers/driftsmeldinger-duck';
import { Environment, Params } from './reducers/environment-duck';
import { FeatureToggles } from './reducers/feature-toggles-duck';

export enum ActionType {
    HENT_INNLOGGINGSSTATUS_OK = 'HENT_INNLOGGINGSSTATUS_OK',
    HENT_INNLOGGINGSSTATUS_FEILET = 'HENT_INNLOGGINGSSTATUS_FEILET',
    HENT_INNLOGGINGSSTATUS_PENDING = 'HENT_INNLOGGINGSSTATUS_PENDING',
    FORNY_INNLOGGING_OK = 'FORNY_INNLOGGING_OK',
    FORNY_INNLOGGING_FEILET = 'FORNY_INNLOGGING_FEILET',
    FORNY_INNLOGGING_PENDING = 'FORNY_INNLOGGING_PENDING',
    HENT_MENY_OK = 'HENT_MENY_OK',
    HENT_MENY_FEILET = 'HENT_MENY_FEILET',
    HENT_MENY_PENDING = 'HENT_MENY_PENDING',
    HENT_DRIFTSMELDING_OK = 'HENT_DRIFTSMELDING_OK',
    HENT_DRIFTSMELDING_FEILET = 'HENT_DRIFTSMELDING_FEILET',
    HENT_DRIFTSMELDING_PENDING = 'HENT_DRIFTSMELDING_PENDING',
    HENT_VARSLER_OK = 'HENT_VARSLER_OK',
    HENT_VARSLER_FEILET = 'HENT_VARSLER_FEILET',
    HENT_VARSLER_PENDING = 'HENT_VARSLER_PENDING',
    SETT_VARSLER_OK = 'SETT_VARSLER_OK',
    SETT_LANGUAGE = 'SETT_LANGUAGE',
    SETT_ENVIRONMENT = 'SETT_ENVIRONMENT',
    SETT_PARAMS = 'SETT_PARAMS',
    SETT_FEATURE_TOGGLES = 'SETT_FEATURE_TOGGLES',
    PRIVATPERSON = 'PRIVATPERSON',
    ARBEIDSGIVER = 'ARBEIDSGIVER',
    SAMARBEIDSPARTNER = 'SAMARBEIDSPARTNER',
    IKKEBESTEMT = 'IKKEBESTEMT',
    TOGGLE_HOVEDMENY = 'TOGGLE_HOVEDMENY',
    TOGGLE_MINSIDE_MENY = 'TOGGLE_MINSIDE_MENY',
    TOGGLE_SOK = 'TOGGLE_SOK',
    TOGGLE_VARSLER = 'TOGGLE_VARSLER',
    TOGGLE_LUKK_ALLE = 'TOGGLE_LUKK_ALLE',
    TOGGLE_VARSEL = 'TOGGLE_VARSEL',
    TOGGLE_UNDERMENY = 'TOGGLE_UNDERMENY',
    TOGGLE_HOVEDOGUNDERMENY = 'TOGGLE_HOVEDOGUNDERMENY',
    FJERN_LEST_VARSEL = 'FJERN_LEST_VARSEL',
}

export interface HentInnloggingsstatusOKAction {
    type: ActionType.HENT_INNLOGGINGSSTATUS_OK;
    data: InnloggingsstatusData & SessionData;
}

export interface HentInnloggingsstatusPENDINGAction {
    type: ActionType.HENT_INNLOGGINGSSTATUS_PENDING;
}

export interface HentInnloggingsstatusFEILETAction {
    type: ActionType.HENT_INNLOGGINGSSTATUS_FEILET;
}
export interface FornyInnloggingOKAction {
    type: ActionType.FORNY_INNLOGGING_OK;
    data: SessionData;
}

export interface FornyInnloggingPENDINGAction {
    type: ActionType.FORNY_INNLOGGING_PENDING;
}

export interface FornyInnloggingFEILETAction {
    type: ActionType.FORNY_INNLOGGING_FEILET;
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

export interface HentDriftsmeldingSUCCESS {
    type: ActionType.HENT_DRIFTSMELDING_OK;
    data: DriftsmeldingerData[];
}

export interface HentDriftsmeldingPENDING {
    type: ActionType.HENT_DRIFTSMELDING_PENDING;
}

export interface HentDriftsmeldingFAILED {
    type: ActionType.HENT_DRIFTSMELDING_FEILET;
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

export interface SettFeatureToggles {
    type: ActionType.SETT_FEATURE_TOGGLES;
    data: FeatureToggles;
}

export interface SettEnviroment {
    type: ActionType.SETT_ENVIRONMENT;
    data: Environment;
}

export interface SettParams {
    type: ActionType.SETT_PARAMS;
    data: Params;
}

export interface SettVarslerOKAction {
    type: ActionType.SETT_VARSLER_OK;
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

export interface SettArbeidsflateIkkeBestemt {
    type: ActionType.IKKEBESTEMT;
}

export interface ToggleHovedmeny {
    type: ActionType.TOGGLE_HOVEDMENY;
}

export interface ToggleMinsidemeny {
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

export interface FjernLestVarselAction {
    type: ActionType.FJERN_LEST_VARSEL;
    eventId: string;
}

export type Handling =
    | HentInnloggingsstatusOKAction
    | HentInnloggingsstatusFEILETAction
    | HentInnloggingsstatusPENDINGAction
    | FornyInnloggingOKAction
    | FornyInnloggingFEILETAction
    | FornyInnloggingPENDINGAction
    | HentMenyLenkerSUCCESS
    | HentMenyLenkerFAILED
    | HentMenyLenkerPENDING
    | HentDriftsmeldingSUCCESS
    | HentDriftsmeldingFAILED
    | HentDriftsmeldingPENDING
    | HentVarslerOKAction
    | HentVarslerFEILETAction
    | HentVarslerPENDINGAction
    | SettEnviroment
    | SettParams
    | SettVarslerOKAction
    | SettPrivatpersonAction
    | SettArbeidsgiverAction
    | SettSamarbeidspartnerAction
    | SettArbeidsflateIkkeBestemt
    | SettFeatureToggles
    | ToggleHovedmeny
    | ToggleMinsidemeny
    | ToggleSok
    | ToggleVarsel
    | ToggleUnderMeny
    | ToggleHovedOgUnderMeny
    | ToggleVarsler
    | ToggleLukkAlle
    | FjernLestVarselAction;
