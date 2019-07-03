import { combineReducers } from 'redux';
import innloggingsstatusReducer, {
    InnloggingsstatusState,
} from './innloggingsstatus-duck';
import sokeResultatReducer, { SokeResultatState } from './soke-duck';

export interface AppState {
    innloggingsstatus: InnloggingsstatusState;
    sokeresultat: SokeResultatState;
}

export const reducer = combineReducers<AppState>({
    innloggingsstatus: innloggingsstatusReducer,
    sokeresultat: sokeResultatReducer,
});
