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

export const FeedbackInformasjon = React.memo(( props: {environment: Environment} ) => (
    <Normaltekst>
        <Tekst id="advarsel-om-personopplysninger" />
        <br/>
        <Tekst id="advarsel-om-svar" />
        <br/>
        <Lenke href={`${props.environment.XP_BASE_URL}/person/kontakt-oss`}><Tekst id="kontakt-oss-1"/></Lenke>
        <Tekst id="kontakt-oss-2" />
        <br/>
        <Tekst id="om-saken-din" />
        <Lenke href={props.environment.DITT_NAV_URL}><Tekst id="logg-inn-ditt-nav"/></Lenke>
    </Normaltekst>
));
