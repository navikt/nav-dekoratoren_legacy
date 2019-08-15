import { combineReducers } from 'redux';
import innloggingsstatusReducer, {
    InnloggingsstatusState,
} from './innloggingsstatus';
import menypunktReducer, { MenyPunkter } from './menuReducer';

export interface AppState {
    innloggingsstatus: InnloggingsstatusState;
    menypunkt: MenyPunkter;
}

export const reducer = combineReducers<AppState>({
    innloggingsstatus: innloggingsstatusReducer,
    menypunkt: menypunktReducer,
});
