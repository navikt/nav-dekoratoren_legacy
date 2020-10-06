import React, { useReducer, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Ingress } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import { sendFeedbackYes } from '../send-feedback';
import FritekstFelt, { fritekstFeilReducer, initialFritekstFeil, MAX_LENGTH } from './fritekst/FritekstFelt';
import { FeedbackInformasjon, QuestionProps, questionStateSelector } from './AlternativCommon';
import KnappeRekke from './KnappeRekke';
import './Alternativ.less';

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
            dispatchFritekstFeil({
                type: 'maxLength', message: `Du kan ikke skrive mer enn ${MAX_LENGTH} tegn`
            });
            textareaRef.current?.focus();
        } else if (fritekstFeil.invalidInput)  {
            textareaRef.current?.focus();
        } else {
            dispatchFritekstFeil({ type: 'reset'});
            sendFeedbackYes(
                feedbackMessage,
                environment.FEEDBACK_API_URL,
                language.toLowerCase(),
                reduxDispatch);

            props.settBesvart();
        }
    };

    return (
        <form className="alternativ-wrapper"
            onSubmit={submitFeedback}
        >
            <FritekstFelt
                feedbackMessage={feedbackMessage}
                setFeedbackMessage={setFeedbackMessage}
                errors={fritekstFeil}
                setErrors={dispatchFritekstFeil}
                description={<FeedbackInformasjon environment={environment}/>}
                label={
                    <Ingress>
                        <Tekst id="hva-lette-du-etter" />
                    </Ingress>
                }
                textareaRef={ inputRef => (textareaRef.current = inputRef)}
                harTrykketSubmit={harTrykketSubmit}

            />
            <KnappeRekke avbryt={props.avbryt} state={props.state} />
        </form>
    );
};

export default AlternativJa;
