import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Ingress, Normaltekst } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import Tekst from 'tekster/finn-tekst';
import { sendFeedbackYes } from '../send-feedback';
import FritekstFelt, { fritekstFeilReducer, initialFritekstFeil, MAX_LENGTH } from './fritekst/FritekstFelt';
import { AppState } from '../../../../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import Lenke from 'nav-frontend-lenker';
import { personvernAdvarsel } from './AlternativCommon';
import { FeedbackState } from '../Feedback';
import AvbrytKnapp from './AvbrytKnapp';
import './Alternativ.less';

const stateSelector = (state: AppState) => ({
    environment: state.environment,
    language: state.language.language
});

interface Props {
    avbryt: () => void,
    settBesvart: () => void,
    state: FeedbackState
}

const AlternativJa = (props: Props) => {
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const { environment, language } = useSelector(stateSelector);
    const dispatch = useDispatch();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [fritekstFeil, dispatchFritekstFeil] = useReducer(fritekstFeilReducer, initialFritekstFeil);

    useEffect(() => {
        if (fritekstFeil.maxLength) {
            dispatchFritekstFeil({ type: 'maxLength', message: undefined})
        }
    }, [feedbackMessage])



    const submitFeedback = (evt: any) => {
        evt.preventDefault();

        if (feedbackMessage.length > MAX_LENGTH) {
            dispatchFritekstFeil({
                type: 'maxLength', message: `Du kan ikke skrive mer enn ${MAX_LENGTH} tegn`,
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
                dispatch);

            props.settBesvart();
        }
    };

    return (
        <div className="alternativ-wrapper">
            <form onSubmit={submitFeedback}>
                <FritekstFelt
                    feedbackMessage={feedbackMessage}
                    setFeedbackMessage={setFeedbackMessage}
                    errors={fritekstFeil}
                    setErrors={dispatchFritekstFeil}
                    description={personvernAdvarsel}
                    label={
                        <Ingress>
                            <Tekst id="hva-lette-du-etter" />
                        </Ingress>
                    }
                    textareaRef={ inputRef => (textareaRef.current = inputRef)}
                />
                <Normaltekst className="alternativ-notis">
                    Ønsker du informasjon om saken din? <Lenke href={environment.DITT_NAV_URL}>Logg inn på Ditt NAV.</Lenke> <br/>
                    Du kan også <Lenke href={`${environment.XP_BASE_URL}/person/kontakt-oss`}>skrive eller ringe til NAV.</Lenke>
                </Normaltekst>
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

export default AlternativJa;
