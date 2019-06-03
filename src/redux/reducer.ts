import { combineReducers } from 'redux';
import innloggingsstatusReducer, { InnloggingsstatusState } from '../ducks/innloggingsstatus';

export interface AppState {
    innloggingsstatus: InnloggingsstatusState;
}

export const reducer = combineReducers<AppState>({
    innloggingsstatus: innloggingsstatusReducer,
});
