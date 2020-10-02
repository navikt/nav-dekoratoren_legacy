import React, { useState, useRef, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Ingress } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import { RadioGruppe, Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { sendFeedbackNo } from '../send-feedback';
import FritekstFelt, { fritekstFeilReducer, initialFritekstFeil, MAX_LENGTH } from './fritekst/FritekstFelt';
import { KontaktLenker, personvernAdvarsel, QuestionProps, questionStateSelector } from './AlternativCommon';
import KnappeRekke from './KnappeRekke';
import './Alternativ.less';

const AlternativNei = (props: QuestionProps) => {
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [reason, setReason] = useState<string>('');
    const { environment, language } = useSelector(questionStateSelector);
    const reduxDispatch = useDispatch();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const radioRef = useRef<HTMLInputElement | null>(null);
    const [reasonFeil, setReasonFeil] = useState<string | undefined>(undefined);
    const [fritekstFeil, dispatchFritekstFeil] = useReducer(fritekstFeilReducer, initialFritekstFeil);

    useEffect(() => {
        if (fritekstFeil.maxLength) {
            dispatchFritekstFeil({ type: 'maxLength', message: undefined });
        }
    }, [feedbackMessage])


    const reasonClicked = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReason(e.target.value)
        setReasonFeil(undefined);
    }


    const submitFeedback = (evt: any) => {
        evt.preventDefault();
        let error = false;
        if (!reason) {
            setReasonFeil( 'Du må velge et alternativ');
            radioRef.current?.focus();
            error = true;
        }

        if (feedbackMessage.length > MAX_LENGTH) {
            dispatchFritekstFeil({ type: 'maxLength', message: `Du kan ikke skrive mer enn ${MAX_LENGTH} tegn` });
            textareaRef.current?.focus();
            error = true;
        }

        if (fritekstFeil.invalidInput)  {
            textareaRef.current?.focus();
            error = true;
        }

        if (!error ) {
            dispatchFritekstFeil({ type: 'reset'});
            setReasonFeil(undefined);
            sendFeedbackNo(
                reason,
                feedbackMessage,
                environment.FEEDBACK_API_URL,
                language.toLowerCase(),
                reduxDispatch);

            props.settBesvart();
        }
    };

    return (
        <form className="alternativ-wrapper"
            onSubmit={submitFeedback}>
            <SkjemaGruppe
                legend={
                    <Ingress>
                        <Tekst id="hva-fant-du-ikke"
                        />
                    </Ingress>}
                description={personvernAdvarsel}
            >
                <RadioGruppe
                    feil={reasonFeil}
                    tag="div"
                >
                    <Radio
                        label={<Tekst id="spørsmål-ikke-besvart" />}
                        name="fant-ikke"
                        value="fant-ikke-1"
                        onChange={reasonClicked}
                        radioRef={ (inputRef: any) => (radioRef.current = inputRef)}
                    />
                    <Radio
                        label={<Tekst id="forstod-ikke" />}
                        name="fant-ikke"
                        value="fant-ikke-2"
                        onChange={reasonClicked}
                    />
                    <Radio
                        label={<Tekst id="hjelpemiddel-feil" />}
                        name="fant-ikke"
                        value="fant-ikke-3"
                        onChange={reasonClicked}
                    />
                    <Radio
                        label={<Tekst id="annet" />}
                        name="fant-ikke"
                        value="fant-ikke-annet"
                        onChange={reasonClicked}
                    />
                </RadioGruppe>
                <FritekstFelt
                    feedbackMessage={feedbackMessage}
                    setFeedbackMessage={setFeedbackMessage}
                    errors={fritekstFeil}
                    setErrors={dispatchFritekstFeil}
                    textareaRef={ inputRef => (textareaRef.current = inputRef)}
                 />
            </SkjemaGruppe>
            <KontaktLenker environment={environment}/>
            <KnappeRekke avbryt={props.avbryt} state={props.state} />
        </form>
    );
};

export default AlternativNei;
