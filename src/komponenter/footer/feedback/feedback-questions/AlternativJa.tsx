import React, { useState } from 'react';
import { Ingress, Normaltekst } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import Tekst from 'tekster/finn-tekst';
import { sendFeedbackYes } from './send-feedback';
import Thankyou from '../feedback-thank-you/ThankYou';
import CloseFeedbackHandler from '../common/CloseFeedbackHandler';
import FeedbackMessage, { MAX_LENGTH } from './FeedbackMessage';
import { AppState } from '../../../../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import Lenke from 'nav-frontend-lenker';
import './Alternativ.less';
import { personvernAdvarsel } from './AlternativCommon';

const stateSelector = (state: AppState) => ({
    environment: state.environment,
    language: state.language.language
});

const AlternativJa = () => {
    const [feedbackTitle, setFeedbackTitle] = useState<string[]>([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const { environment, language } = useSelector(stateSelector);
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({
        textFieldInvalidInputs: '',
        errorHasOccured: false,
    });

    const submitFeedback = (evt: any) => {
        evt.preventDefault();


        if (feedbackMessage.length > MAX_LENGTH) {
            setErrors({
                ...errors,
                textFieldInvalidInputs: `Du kan ikke skrive mer enn ${MAX_LENGTH} tegn`
            });
        } else {
            setErrors({
                ...errors,
                textFieldInvalidInputs: '',
                errorHasOccured: false
            });
            sendFeedbackYes(
                feedbackMessage,
                environment.FEEDBACK_API_URL,
                language.toLowerCase(),
                dispatch);

            setHasSubmitted(true);
        }
    };


    return (
        <>
            {!hasSubmitted ? (
                <div className="alternativ-wrapper">
                    <form onSubmit={submitFeedback}>
                        <FeedbackMessage
                            feedbackMessage={feedbackMessage}
                            setFeedbackMessage={setFeedbackMessage}
                            errors={errors}
                            setErrors={setErrors}
                            description={personvernAdvarsel}
                            label={
                                <Ingress>
                                    <Tekst id="hva-lette-du-etter" />
                                </Ingress>
                            }
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
                            <CloseFeedbackHandler context="alternativ-ja" />
                        </div>
                    </form>
                </div>
            ) : (
                <Thankyou showFeedbackUsage={true} />
            )}
        </>
    );
};

export default AlternativJa;
