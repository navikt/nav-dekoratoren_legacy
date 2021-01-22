import React, { useState, useRef, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tekst, { finnTekst } from 'tekster/finn-tekst';
import { createFeedbackRespons } from '../createFeedbackRespons';
import FritekstFelt, { fritekstFeilReducer, initialFritekstFeil, MAX_LENGTH } from './fritekst/FritekstFelt';
import { KontaktOss, QuestionProps, questionStateSelector } from './AlternativCommon';
import KnappeRekke from './KnappeRekke';
import { lagreTilbakemelding } from '../../../../store/reducers/tilbakemelding-duck';
import { logAmplitudeEvent } from '../../../../utils/amplitude';
import { AppState } from '../../../../store/reducers';
import { MenuValue } from '../../../../utils/meny-storage-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import './Alternativ.less';

const AlternativNei = (props: QuestionProps) => {
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [harTrykketSubmit, setHarTrykketSubmit] = useState(false);
    const { environment, language } = useSelector(questionStateSelector);
    const reduxDispatch = useDispatch();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [fritekstFeil, dispatchFritekstFeil] = useReducer(fritekstFeilReducer, initialFritekstFeil);
    const { arbeidsflate } = useSelector((state: AppState) => state);

    const kontaktOssUrl =
        arbeidsflate.status === MenuValue.ARBEIDSGIVER
            ? 'https://arbeidsgiver.nav.no/kontakt-oss'
            : `${environment.XP_BASE_URL}/person/kontakt-oss`;

    const submitFeedback = (evt: any) => {
        evt.preventDefault();
        let error = false;

        if (feedbackMessage.length > MAX_LENGTH) {
            const errorMelding = finnTekst('textarea-feilmelding', language, MAX_LENGTH.toString());
            dispatchFritekstFeil({ type: 'maxLength', message: errorMelding });
            textareaRef.current?.focus();
            error = true;
        }

        if (fritekstFeil.invalidInput) {
            textareaRef.current?.focus();
            error = true;
        }
        setHarTrykketSubmit(true);

        if (!error) {
            dispatchFritekstFeil({ type: 'reset' });
            const feedback = createFeedbackRespons(feedbackMessage, language, 'No');
            lagreTilbakemelding(feedback, environment.FEEDBACK_API_URL)(reduxDispatch);
            logAmplitudeEvent('tilbakemelding', { kilde: 'footer', fritekst: 'besvart' });
            props.settBesvart();
        }
    };

    return (
        <form className="alternativ-wrapper" onSubmit={submitFeedback}>
            <FritekstFelt
                feedbackMessage={feedbackMessage}
                setFeedbackMessage={setFeedbackMessage}
                errors={fritekstFeil}
                setErrors={dispatchFritekstFeil}
                textareaRef={(inputRef) => (textareaRef.current = inputRef)}
                harTrykketSubmit={harTrykketSubmit}
                description={
                    <Normaltekst>
                        <Tekst id="forklaring-fritekst-nei" />
                        <Tekst id="hensikt-med-tilbakemelding" />
                        <Tekst id="forklaring-fritekst" />
                    </Normaltekst>
                }
            />
            <KnappeRekke avbryt={props.settBesvart} />
            <Normaltekst className="kontaktOss">
                <KontaktOss />
            </Normaltekst>
        </form>
    );
};

export default AlternativNei;
