import React from 'react';
import Tekst from 'tekster/finn-tekst';
import { Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { FeedbackState } from '../Feedback';
import { AppState } from '../../../../store/reducers';
import { useSelector } from 'react-redux';
import './Alternativ.less';

export const questionStateSelector = (state: AppState) => ({
    environment: state.environment,
    language: state.language.language,
});

export interface QuestionProps {
    avbryt: () => void;
    settBesvart: () => void;
    state: FeedbackState;
}

export const FeedbackInformasjon = React.memo(() => {
    const { environment } = useSelector((state: AppState) => state);
    return (
        <Normaltekst>
            <Tekst id="advarsel-om-personopplysninger" />
            <br />
            <Tekst id="advarsel-om-svar" />
            <br />
            <Lenke href={`${environment.XP_BASE_URL}/person/kontakt-oss`}>
                <Tekst id="kontakt-oss-1" />
            </Lenke>
            <Tekst id="kontakt-oss-2" />
            <br />
            <Tekst id="om-saken-din" />
            <Lenke href={environment.DITT_NAV_URL}>
                <Tekst id="logg-inn-ditt-nav" />
            </Lenke>
        </Normaltekst>
    );
});
