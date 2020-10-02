import React from 'react';
import Tekst from 'tekster/finn-tekst';
import { Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { Environment } from '../../../../store/reducers/environment-duck';
import { FeedbackState } from '../Feedback';
import { AppState } from '../../../../store/reducers';
import './Alternativ.less';

export const questionStateSelector = (state: AppState) => ({
    environment: state.environment,
    language: state.language.language
});

export interface QuestionProps {
    avbryt: () => void,
    settBesvart: () => void,
    state: FeedbackState
}

export const personvernAdvarsel = (
    <Normaltekst>
        <Tekst id="advarsel-om-personopplysninger" />
        <br/>
        <Tekst id="advarsel-om-svar" />
    </Normaltekst>
)

export const KontaktLenker =  React.memo(( props: {environment: Environment} ) => {
    return (
        <Normaltekst className="alternativ-notis">
            Ønsker du informasjon om saken din? <Lenke href={props.environment.DITT_NAV_URL}>Logg inn på Ditt NAV.</Lenke> <br />
            Du kan også <Lenke href={`${props.environment.XP_BASE_URL}/person/kontakt-oss`}>skrive eller ringe til NAV.</Lenke>
        </Normaltekst>
    );
});
