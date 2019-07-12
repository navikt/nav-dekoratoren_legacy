import { combineReducers } from 'redux';
import innloggingsstatusReducer, {
    InnloggingsstatusState,
} from './innloggingsstatus-duck';
import varselinnboksReducer, {
    VarselinnboksState,
} from './varselinnboks-duck';

export interface AppState {
    innloggingsstatus: InnloggingsstatusState;
    varsler: VarselinnboksState;
}

export const reducer = combineReducers<AppState>({
    innloggingsstatus: innloggingsstatusReducer,
    varsler: varselinnboksReducer,
});
