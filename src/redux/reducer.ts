import { combineReducers } from 'redux';
import innloggingsstatusReducer, { InnloggingsstatusState } from './innloggingsstatus-duck';

export interface AppState {
    innloggingsstatus: InnloggingsstatusState;
}

export const reducer = combineReducers<AppState>({
    innloggingsstatus: innloggingsstatusReducer,
});
