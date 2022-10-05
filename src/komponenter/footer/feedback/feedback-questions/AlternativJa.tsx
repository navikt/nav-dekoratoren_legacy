import React, { useReducer, useRef, useState } from 'react';
import { finnTekst } from 'tekster/finn-tekst';
import { createFeedbackRespons } from '../createFeedbackRespons';
import FritekstFelt, { fritekstFeilReducer, initialFritekstFeil, MAX_LENGTH } from './fritekst/FritekstFelt';
import { FeedbackInformasjon, QuestionProps, questionStateSelector } from './AlternativCommon';
import KnappeRekke from './KnappeRekke';
import { lagreTilbakemelding } from '../../../../store/reducers/tilbakemelding-duck';
import { useDispatch, useSelector } from 'react-redux';
import { logAmplitudeEvent } from '../../../../utils/analytics/amplitude';

const AlternativJa = (props: QuestionProps) => {
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [harTrykketSubmit, setHarTrykketSubmit] = useState(false);
    const { environment, language } = useSelector(questionStateSelector);
    const reduxDispatch = useDispatch();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [fritekstFeil, dispatchFritekstFeil] = useReducer(fritekstFeilReducer, initialFritekstFeil);

    const submitFeedback = (evt: any) => {
        evt.preventDefault();

        setHarTrykketSubmit(true);

        if (feedbackMessage.length > MAX_LENGTH) {
            const errorMelding = finnTekst('textarea-feilmelding', language, MAX_LENGTH.toString());
            dispatchFritekstFeil({
                type: 'maxLength',
                message: errorMelding,
            });
            textareaRef.current?.focus();
        } else if (fritekstFeil.invalidInput) {
            textareaRef.current?.focus();
        } else {
            dispatchFritekstFeil({ type: 'reset' });
            const feedback = createFeedbackRespons(feedbackMessage, language, 'Yes');
            lagreTilbakemelding(feedback, environment.FEEDBACK_API_URL)(reduxDispatch);
            logAmplitudeEvent('tilbakemelding', { kilde: 'footer', fritekst: 'besvart' });
            props.settBesvart();
        }
    };

    return (
        <form onSubmit={submitFeedback}>
            <FritekstFelt
                feedbackMessage={feedbackMessage}
                setFeedbackMessage={setFeedbackMessage}
                errors={fritekstFeil}
                setErrors={dispatchFritekstFeil}
                description={<FeedbackInformasjon />}
                textareaRef={(inputRef) => (textareaRef.current = inputRef)}
                harTrykketSubmit={harTrykketSubmit}
            />
            <KnappeRekke avbryt={props.settBesvart} />
        </form>
    );
};

export default AlternativJa;
