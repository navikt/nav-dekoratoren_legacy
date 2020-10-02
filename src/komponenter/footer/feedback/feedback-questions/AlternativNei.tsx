import React, { useState, useMemo, useRef, useEffect, useReducer } from 'react';
import { Ingress } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import Tekst from 'tekster/finn-tekst';
import { RadioGruppe, Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { sendFeedbackNo } from '../send-feedback';
import FritekstFelt, { fritekstFeilReducer, initialFritekstFeil, MAX_LENGTH } from './fritekst/FritekstFelt';
import { andreSider, personvernAdvarsel } from './AlternativCommon';
import './Alternativ.less';
import { AppState } from '../../../../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import AvbrytKnapp from './AvbrytKnapp';
import { FeedbackState } from '../Feedback';

const stateSelector = (state: AppState) => ({
    environment: state.environment,
    language: state.language.language
});

interface Props {
    avbryt: () => void,
    settBesvart: () => void,
    state: FeedbackState
}


const AlternativNei = (props: Props) => {
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [reason, setReason] = useState<string>('');
    const { environment, language } = useSelector(stateSelector);
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

    const choices = (
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
    );

    const lenkeKomponent = useMemo(() => andreSider(environment), [environment]);

    return (
        <div className="alternativ-wrapper">
            <form onSubmit={submitFeedback}>
                <SkjemaGruppe
                    legend={
                        <Ingress>
                            <Tekst id="hva-fant-du-ikke"
                            />
                        </Ingress>}
                    description={personvernAdvarsel}
                >
                    {choices}
                    <FritekstFelt
                        feedbackMessage={feedbackMessage}
                        setFeedbackMessage={setFeedbackMessage}
                        errors={fritekstFeil}
                        setErrors={dispatchFritekstFeil}
                        textareaRef={ inputRef => (textareaRef.current = inputRef)}
                     />
                </SkjemaGruppe>
                {lenkeKomponent}
                <div className="knapper">
                    <Hovedknapp
                        htmlType="submit"
                        className="send-inn"
                    >
                        <Tekst id="send-inn-tilbakemelding" />
                    </Hovedknapp>
                    <AvbrytKnapp avbryt={props.avbryt} state={props.state} />
                </div>
            </form>
        </div>
    );
};

export default AlternativNei;
