import React, { useState, useMemo, useContext } from 'react';
import { Ingress } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import Tekst from 'tekster/finn-tekst';
import { RadioGruppe, Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { sendFeedbackNo } from './send-feedback';
import FeedbackMessage, { MAX_LENGTH } from './FeedbackMessage';
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
    const [reason, setReason] = useState<string>();
    const { environment, language } = useSelector(stateSelector);
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({
        radiobuttonErrorMessage: '',
        textFieldInvalidInputs: '',
        errorHasOccured: false,
    });

    const submitFeedback = (evt: any) => {
        evt.preventDefault();

        if (!reason) {
            setErrors({
                ...errors,
                radiobuttonErrorMessage: 'Du må velge et alternativ',
                errorHasOccured: true,
            });
        } else if (feedbackMessage.length > MAX_LENGTH) {
            setErrors({
                ...errors,
                textFieldInvalidInputs: `Du kan ikke skrive mer enn ${MAX_LENGTH} tegn`
            });
        } else {
            setErrors({
                ...errors,
                radiobuttonErrorMessage: '',
                textFieldInvalidInputs: '',
                errorHasOccured: false
            });
            sendFeedbackNo(
                reason,
                feedbackMessage,
                environment.FEEDBACK_API_URL,
                language.toLowerCase(),
                dispatch);

            props.settBesvart();
        }
    };

    const choices = (
        <RadioGruppe
            feil={errors.radiobuttonErrorMessage}
            tag="div"
        >
            <Radio
                label={<Tekst id="spørsmål-ikke-besvart" />}
                name="fant-ikke"
                value="fant-ikke-1"
                onChange={(e) =>
                    setReason(e.target.value)
                }
            />
            <Radio
                label={<Tekst id="forstod-ikke" />}
                name="fant-ikke"
                value="fant-ikke-2"
                onChange={(e) =>
                    setReason(e.target.value)
                }
            />
            <Radio
                label={<Tekst id="hjelpemiddel-feil" />}
                name="fant-ikke"
                value="fant-ikke-3"
                onChange={(e) =>
                    setReason(e.target.value)
                }
            />
            <Radio
                label={<Tekst id="annet" />}
                name="fant-ikke"
                value="fant-ikke-annet"
                onChange={(e) =>
                    setReason(e.target.value)
                }
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
                    <FeedbackMessage
                        feedbackMessage={feedbackMessage}
                        setFeedbackMessage={setFeedbackMessage}
                        errors={errors}
                        setErrors={setErrors}
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
