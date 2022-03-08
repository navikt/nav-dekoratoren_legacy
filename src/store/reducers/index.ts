import { combineReducers } from 'redux';
import arbeidsflateReducer, { Arbeidsflate } from './arbeidsflate-duck';
import innloggingsstatusReducer from './innloggingsstatus-duck';
import { InnloggingsstatusState } from './innloggingsstatus-duck';
import menypunktReducer, { MenyPunkter } from './menu-duck';
import varselinnboksReducer, { VarselinnboksState } from './varselinnboks-duck';
import driftsmeldingReducer from './driftsmeldinger-duck';
import { DriftsmeldingerState } from './driftsmeldinger-duck';
import { DataElement } from 'api/api';
import varselLestReducer from './varsel-lest-duck';
import { languageDuck, LanguageState } from './language-duck';
import dropdownTogglesReducer, { DropdownState } from './dropdown-toggle-duck';
import environmentReducer, { Environment } from './environment-duck';
import featureToggleReducer from './feature-toggles-duck';
import { FeatureToggles } from './feature-toggles-duck';
import tilbakemeldingsReducer from './tilbakemelding-duck';
import utloggingsvarselReducer, { UtloggingsvarselState } from './utloggingsvarsel-duck';

export interface AppState {
    environment: Environment;
    innloggingsstatus: InnloggingsstatusState;
    menypunkt: MenyPunkter;
    varsler: VarselinnboksState;
    varslerLest: DataElement;
    language: LanguageState;
    arbeidsflate: Arbeidsflate;
    dropdownToggles: DropdownState;
    driftsmeldinger: DriftsmeldingerState;
    featureToggles: FeatureToggles;
    tilbakemeldinger: DataElement;
    utloggingsvarsel: UtloggingsvarselState;
}

export const reducers = combineReducers<AppState>({
    environment: environmentReducer,
    innloggingsstatus: innloggingsstatusReducer,
    menypunkt: menypunktReducer,
    varsler: varselinnboksReducer,
    varslerLest: varselLestReducer,
    language: languageDuck.reducer,
    arbeidsflate: arbeidsflateReducer,
    dropdownToggles: dropdownTogglesReducer,
    driftsmeldinger: driftsmeldingReducer,
    featureToggles: featureToggleReducer,
    tilbakemeldinger: tilbakemeldingsReducer,
    utloggingsvarsel: utloggingsvarselReducer,
});

export default reducers;
