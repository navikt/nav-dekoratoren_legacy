import { combineReducers } from 'redux';
import innloggingsstatusReducer, {
    InnloggingsstatusState,
} from './innloggingsstatus';
import menypunktReducer, { MenyPunkter } from './menuReducer';
import varselinnboksReducer, { VarselinnboksState } from './varselinnboks-duck';
import varselLestReducer from './varsel-lest-duck';
import { DataElement } from '../api/Datalaster';

export interface AppState {
    innloggingsstatus: InnloggingsstatusState;
    menypunkt: MenyPunkter;
    varsler: VarselinnboksState;
    varslerLest: DataElement;
}

export const reducer = combineReducers<AppState>({
    innloggingsstatus: innloggingsstatusReducer,
    menypunkt: menypunktReducer,
    varsler: varselinnboksReducer,
    varslerLest: varselLestReducer,
});
