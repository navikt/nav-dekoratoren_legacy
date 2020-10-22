import React, { useState, useRef, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Ingress } from 'nav-frontend-typografi';
import Tekst, { finnTekst, finnTekstMedPayload } from 'tekster/finn-tekst';
import { RadioGruppe, Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { createFeedbackRespons } from '../createFeedbackRespons';
import FritekstFelt, { fritekstFeilReducer, initialFritekstFeil, MAX_LENGTH } from './fritekst/FritekstFelt';
import { FeedbackInformasjon, QuestionProps, questionStateSelector } from './AlternativCommon';
import KnappeRekke from './KnappeRekke';
import './Alternativ.less';
import { Locale } from '../../../../store/reducers/language-duck';
import { lagreTilbakemelding } from '../../../../store/reducers/tilbakemelding-duck';
import { logAmplitudeEvent } from '../../../../utils/amplitude';

const AlternativNei = (props: QuestionProps) => {
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [harTrykketSubmit, setHarTrykketSubmit] = useState(false);
    const [reason, setReason] = useState<string>('');
    const { environment, language } = useSelector(questionStateSelector);
    const reduxDispatch = useDispatch();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const radioRef = useRef<HTMLInputElement | null>(null);
    const [reasonFeil, setReasonFeil] = useState<string | undefined>(undefined);
    const [fritekstFeil, dispatchFritekstFeil] = useReducer(fritekstFeilReducer, initialFritekstFeil);

    const reasonClicked = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReason(e.target.value);
        setReasonFeil(undefined);
    };

    const submitFeedback = (evt: any) => {
        evt.preventDefault();
        let error = false;
        if (!reason) {
            setReasonFeil(finnTekst('svar-mangler', language));
            radioRef.current?.focus();
            error = true;
        }

        if (feedbackMessage.length > MAX_LENGTH) {
            const errorMelding = finnTekstMedPayload('textarea-feilmelding', language, MAX_LENGTH.toString());
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
            setReasonFeil(undefined);
            const feedback = createFeedbackRespons(feedbackMessage, language, 'No', reason);
            lagreTilbakemelding(feedback, environment.FEEDBACK_API_URL)(reduxDispatch);
            logAmplitudeEvent('tilbakemelding-nei', { svar: reason });
            props.settBesvart();
        }
    };

    return (
        <form className="alternativ-wrapper" onSubmit={submitFeedback}>
            <SkjemaGruppe
                legend={
                    <Ingress>
                        <Tekst id="hva-fant-du-ikke" />
                    </Ingress>
                }
                description={<FeedbackInformasjon />}
            >
                <RadioGruppe feil={reasonFeil} tag="div">
                    <Radio
                        label={<Tekst id="spørsmål-ikke-besvart" />}
                        name="fant-ikke"
                        value={finnTekst('spørsmål-ikke-besvart', Locale.BOKMAL)}
                        onChange={reasonClicked}
                        radioRef={(inputRef: any) => (radioRef.current = inputRef)}
                    />
                    <Radio
                        label={<Tekst id="forstod-ikke" />}
                        name="fant-ikke"
                        value={finnTekst('forstod-ikke', Locale.BOKMAL)}
                        onChange={reasonClicked}
                    />
                    <Radio
                        label={<Tekst id="hjelpemiddel-feil" />}
                        name="fant-ikke"
                        value={finnTekst('hjelpemiddel-feil', Locale.BOKMAL)}
                        onChange={reasonClicked}
                    />
                    <Radio
                        label={<Tekst id="annet" />}
                        name="fant-ikke"
                        value={finnTekst('annet', Locale.BOKMAL)}
                        onChange={reasonClicked}
                    />
                </RadioGruppe>
                <FritekstFelt
                    feedbackMessage={feedbackMessage}
                    setFeedbackMessage={setFeedbackMessage}
                    errors={fritekstFeil}
                    setErrors={dispatchFritekstFeil}
                    textareaRef={(inputRef) => (textareaRef.current = inputRef)}
                    harTrykketSubmit={harTrykketSubmit}
                />
            </SkjemaGruppe>
            <KnappeRekke avbryt={props.avbryt} state={props.state} />
        </form>
    );
};

export default AlternativNei;
