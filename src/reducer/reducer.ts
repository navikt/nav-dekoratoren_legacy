import { combineReducers } from 'redux';
import innloggingsstatusReducer, {
    InnloggingsstatusState,
} from './innloggingsstatus-duck';
import menypunktReducer, { MenyPunkter } from './menu-duck';
import varselinnboksReducer, { VarselinnboksState } from './varselinnboks-duck';
import { DataElement } from '../api/api';
import varselLestReducer from './varsel-lest-duck';
import { languageDuck, LanguageState } from './language-duck';
import arbeidsflateReducer, { Arbeidsflate } from './arbeidsflate-duck';
import dropdownTogglesReducer, { DropdownState } from './dropdown-toggle-duck';

export interface AppState {
    innloggingsstatus: InnloggingsstatusState;
    menypunkt: MenyPunkter;
    varsler: VarselinnboksState;
    varslerLest: DataElement;
    language: LanguageState;
    arbeidsflate: Arbeidsflate;
    dropdownToggles: DropdownState;
}

export const reducer = combineReducers<AppState>({
    innloggingsstatus: innloggingsstatusReducer,
    menypunkt: menypunktReducer,
    varsler: varselinnboksReducer,
    varslerLest: varselLestReducer,
    language: languageDuck.reducer,
    arbeidsflate: arbeidsflateReducer,
    dropdownToggles: dropdownTogglesReducer,
});
