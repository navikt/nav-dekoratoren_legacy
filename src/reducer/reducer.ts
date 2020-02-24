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
import { ActionType } from '../redux/actions';

export interface AppState {
    innloggingsstatus: InnloggingsstatusState;
    menypunkt: MenyPunkter;
    varsler: VarselinnboksState;
    varslerLest: DataElement;
    language: LanguageState;
    arbeidsflate: Arbeidsflate;
    uinnloggetMenyIsOpen: boolean;
}

export const reducer = combineReducers<AppState>({
    innloggingsstatus: innloggingsstatusReducer,
    menypunkt: menypunktReducer,
    varsler: varselinnboksReducer,
    varslerLest: varselLestReducer,
    language: languageDuck.reducer,
    arbeidsflate: arbeidsflateReducer,
    uinnloggetMenyIsOpen: (state = false, action) => {
        if (action.type !== ActionType.MENY_UINNLOGGET_TOGGLE) {
            return state;
        }
        return !state;
    }
});
