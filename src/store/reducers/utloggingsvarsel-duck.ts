import {
    ActionType,
    Handling,
    SettUtloggingsvarselEkspandert,
    SettUtloggingsvarselMinimert,
    SettUtloggingsvarselOpppdatereStatus
} from '../actions';

export enum VarselEkspandert {
    MINIMERT = 'MINIMERT',
    EKSPANDERT = 'EKSPANDERT',
}

export interface ParsedJwtToken {
    UTLOGGINGSVARSEL: boolean,
    TIMESTAMP: number
}

export interface UtloggingsVarselProperties {
    UTLOGGINGSVARSEL: boolean;
    state: UtloggingsvarselState;
}

export const initialState: UtloggingsvarselState = {
    varselState: VarselEkspandert.EKSPANDERT,
    vistSistePaminnelse: false,
    modalLukketAvBruker: false,
    origin: '',
    timeStamp: 0,
    miljo: ''
};

export interface UtloggingsvarselState {
    varselState: VarselEkspandert;
    vistSistePaminnelse: boolean;
    modalLukketAvBruker: boolean;
    origin: string;
    timeStamp: number;
    miljo: string;
}

export const utloggingsvarselEkspander = (): SettUtloggingsvarselEkspandert => ({
    type: ActionType.SETT_UTLOGGINGSVARSEL_EKSPANDERT
});

export const utloggingsvarselMinimer = (): SettUtloggingsvarselMinimert => ({
    type: ActionType.SET_UTLOGGINSVARSEL_MINIMERT
});

export const utloggingsvarselOppdatereStatus = (data: Partial<UtloggingsvarselState>):
    SettUtloggingsvarselOpppdatereStatus => ({
    data,
    type: ActionType.SETT_UTLOGGINSVARSEL_OPPDATERESTATUS
});

export default function reducer(state: UtloggingsvarselState = initialState, action: Handling): UtloggingsvarselState { //NOSONAR
    switch (action.type) {
        case ActionType.SET_UTLOGGINSVARSEL_MINIMERT: {
            return { ...state, varselState: VarselEkspandert.MINIMERT };
        }
        case  ActionType.SETT_UTLOGGINGSVARSEL_EKSPANDERT: {
            return { ...state, varselState: VarselEkspandert.EKSPANDERT };
        }
        case ActionType.SETT_UTLOGGINSVARSEL_OPPDATERESTATUS: {
            return { ...state, ...action.data };
        }
        default:
            return state;
    }
}

