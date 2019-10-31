import { combineReducers } from 'redux';
import innloggingsstatusReducer, {
    InnloggingsstatusState,
} from './innloggingsstatus-duck';
import menypunktReducer, { MenyPunkter } from './menu-duck';
import arbeidsflateReducer from './arbeidsflate-duckMcDuck';
import varselinnboksReducer, { VarselinnboksState } from './varselinnboks-duck';
import { DataElement } from '../api/api';
import varselLestReducer from './varsel-lest-duck';
import { languageDuck, LanguageState } from './language-duck';
import { Arbeidsflate } from './arbeidsflate-duckMcDuck';

export interface AppState {
    innloggingsstatus: InnloggingsstatusState;
    menypunkt: MenyPunkter;
    varsler: VarselinnboksState;
    varslerLest: DataElement;
    language: LanguageState;
    arbeidsflate: Arbeidsflate;
}

export const reducer = combineReducers<AppState>({
    innloggingsstatus: innloggingsstatusReducer,
    menypunkt: menypunktReducer,
    varsler: varselinnboksReducer,
    varslerLest: varselLestReducer,
    language: languageDuck.reducer,
    arbeidsflate: arbeidsflateReducer,
});
