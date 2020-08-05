import React, {
    useState,
    Fragment,
    ChangeEvent,
    useEffect,
    useRef,
} from 'react';
import { Element, Ingress } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import Tekst from 'tekster/finn-tekst';
import {
    CheckboxGruppe,
    Checkbox,
    Feiloppsummering,
} from 'nav-frontend-skjema';
import FeedbackMessage from '../common/feedback-message/FeedbackMessage';
import sendFeedbackNo from './send-feedback-no';
import Thankyou from '../feedback-thank-you/ThankYou';
import CloseFeedbackHandler from '../common/CloseFeedbackHandler';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import './AlternativNei.less';

const AlternativNei = () => {
    const [feedbackTitle, setFeedbackTitle] = useState<string[]>([]);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const { language } = useSelector((state: AppState) => state.language);

    const [thankYouMessage, setThankYouMessage] = useState(false);

    const [errors, setErrors] = useState({
        checkboxErrorMessage: '',
        textFieldInvalidInputs: '',
        errorHasOccured: false,
    });

    let feedbackTitles = [...feedbackTitle];

    /*

    Sørger for korrekt state når flere bokser hukes av

    */
    const onClickAarsak = (evt: ChangeEvent<HTMLInputElement>) => {
        feedbackTitles.includes(evt.target.value)
            ? (feedbackTitles = feedbackTitles.filter(
                  (e) => e !== evt.target.value
              ))
            : feedbackTitles.push(evt.target.value);

        setFeedbackTitle(feedbackTitles);
    };

    const submitFeedback = (evt: any) => {
        evt.preventDefault();

        if (!feedbackTitles.length) {
            setErrors({
                ...errors,
                checkboxErrorMessage: 'Du må velge et av alternativene',
                errorHasOccured: true,
            });
        } else {
            if (feedbackMessage.length <= 2000) {
                setErrors({
                    ...errors,
                    checkboxErrorMessage: '',
                });
                sendFeedbackNo(
                    feedbackTitle,
                    feedbackMessage,
                    language.toLowerCase()
                );
                setThankYouMessage(true);
            }
        }
    };

    /*

    Sørger for at feil blir sjekket på onChange, etter at 'Send inn' er trykket, iht skjemavalideringskrav

    */
    useEffect(() => {
        if (errors.errorHasOccured) {
            if (feedbackTitles.length) {
                setErrors({
                    ...errors,
                    checkboxErrorMessage: '',
                    errorHasOccured: true,
                });
            }
        }
    }, [feedbackTitle]);

    return (
        <Fragment>
            {!thankYouMessage ? (
                <div className="alternativ-nei-wrapper">
                    <div className="overskrift-container">
                        <Ingress>
                            <Tekst id="send-undersokelse-takk" />
                        </Ingress>
                    </div>

                    <div className="alternativ-nei-container">
                        <form onSubmit={submitFeedback}>
                            <Element className="sub-overskrift">
                                <Tekst id="gi-din-vurdering-av-informasjon" />
                            </Element>

                            <CheckboxGruppe
                                feil={errors.checkboxErrorMessage}
                                id="category"
                            >
                                <Checkbox
                                    label={<Tekst id="lite-relevant-info" />}
                                    value="relevant"
                                    onChange={(e) => onClickAarsak(e)}
                                />
                                <Checkbox
                                    label={<Tekst id="lite-forstaaelig" />}
                                    value="forstaaelig"
                                    onChange={(e) => onClickAarsak(e)}
                                />
                                <Checkbox
                                    label={<Tekst id="lite-oversiktlig" />}
                                    value="oversiktlig"
                                    onChange={(e) => onClickAarsak(e)}
                                />
                            </CheckboxGruppe>

                            <div>
                                <Element>
                                    <Tekst id="hva-lette-du-etter-spørsmål" />
                                </Element>

                                <FeedbackMessage
                                    feedbackMessage={feedbackMessage}
                                    setFeedbackMessage={setFeedbackMessage}
                                    errors={errors}
                                    setErrors={setErrors}
                                />
                            </div>

                            {errors.checkboxErrorMessage.length ? (
                                <Feiloppsummering
                                    tittel="For å gå videre må du rette opp følgende:"
                                    feil={[
                                        {
                                            skjemaelementId: 'category',
                                            feilmelding: errors.checkboxErrorMessage.toString(),
                                        },
                                    ]}
                                />
                            ) : null}

                            <div className="knapper">
                                <div className="send-inn">
                                    <Hovedknapp
                                        htmlType="submit"
                                        className="reset-knapp"
                                    >
                                        <Tekst id="send-inn-feilrapport" />
                                    </Hovedknapp>
                                </div>
                                <CloseFeedbackHandler context="alternativ-nei" />
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <Thankyou showFeedbackUsage={true} />
            )}
        </Fragment>
    );
};

export default AlternativNei;
