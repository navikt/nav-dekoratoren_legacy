import { combineReducers } from 'redux';
import innloggingsstatusReducer, {
    InnloggingsstatusState,
} from './innloggingsstatus-duck';
import varselinnboksReducer, {
    VarselinnboksState,
} from './varselinnboks-duck';
import varselLestReducer from './varsel-lest-duck';
import { DataElement } from '../api/Datalaster';

export interface AppState {
    innloggingsstatus: InnloggingsstatusState;
    varsler: VarselinnboksState;
    varslerLest: DataElement;
}

export const reducer = combineReducers<AppState>({
    innloggingsstatus: innloggingsstatusReducer,
    varsler: varselinnboksReducer,
    varslerLest: varselLestReducer
});
