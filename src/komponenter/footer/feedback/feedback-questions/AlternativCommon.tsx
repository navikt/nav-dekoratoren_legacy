import React from 'react';
import { BodyLong } from '@navikt/ds-react';
import Tekst from 'tekster/finn-tekst';
import { FeedbackState } from '../Feedback';
import { AppState } from 'store/reducers';
import './Alternativ.less';

export const questionStateSelector = (state: AppState) => ({
    environment: state.environment,
    language: state.language.language,
});

export interface QuestionProps {
    settBesvart: () => void;
    state: FeedbackState;
}

export const FeedbackInformasjon = () => (
    <BodyLong>
        <Tekst id="advarsel-om-personopplysninger" />
    </BodyLong>
);
