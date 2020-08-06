import React, { useState, Fragment, useEffect } from 'react';
import { RadioGruppe, Radio, Feiloppsummering } from 'nav-frontend-skjema';
import { Element, Ingress } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import Tekst from 'tekster/finn-tekst';
import FeedbackMessage from '../common/feedback-message/FeedbackMessage';
import sendFeedbackReport from './send-feedback-report';
import Thankyou from '../feedback-thank-you/ThankYou';
import CloseFeedbackHandler from '../common/CloseFeedbackHandler';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import './AlternativFeilMangler.less';

const AlternativFeilMangler = () => {
    const [category, setCategory] = useState(String);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const [thankYouMessage, setThankYouMessage] = useState(false);

    const [errors, setErrors] = useState({
        radiobuttonErrorMessage: '',
        textFieldInvalidInputs: '',
        errorHasOccured: false,
    });

    const { language } = useSelector((state: AppState) => state.language);

    const submitFeedback = (evt: any) => {
        evt.preventDefault();

        if (!category.length) {
            setErrors({
                ...errors,
                radiobuttonErrorMessage: 'Du må velge et av alternativene',
                errorHasOccured: true,
            });
        } else {
            if (feedbackMessage.length <= 2000) {
                setErrors({
                    ...errors,
                    radiobuttonErrorMessage: '',
                });
                sendFeedbackReport(
                    category,
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
            if (category.length) {
                setErrors({
                    ...errors,
                    radiobuttonErrorMessage: '',
                    errorHasOccured: true,
                });
            }
        }
    }, [category]);

    return (
        <Fragment>
            {!thankYouMessage ? (
                <div className="rapporter-om-feil-wrapper">
                    <div className="overskrift-container">
                        <Ingress>
                            <Tekst id="rapporter-om-feil-mangler" />
                        </Ingress>
                    </div>

                    <div className="alternativ-feil-mangler-container">
                        <form onSubmit={submitFeedback}>
                            <Element className="sub-overskrift">
                                <Tekst id="velg-type-feil-mangler" />
                            </Element>

                            <RadioGruppe
                                feil={errors.radiobuttonErrorMessage}
                                id="category"
                            >
                                <Radio
                                    label={<Tekst id="teknisk-feil" />}
                                    name="feil"
                                    value="teknisk_feil"
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                />
                                <Radio
                                    label={<Tekst id="skjermleser" />}
                                    name="feil"
                                    value="skjermleser"
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                />
                                <Radio
                                    label={<Tekst id="annet" />}
                                    name="feil"
                                    value="annet"
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                />
                            </RadioGruppe>

                            <div>
                                <Element>
                                    <Tekst id="din-tilbakemelding" />
                                </Element>

                                <FeedbackMessage
                                    feedbackMessage={feedbackMessage}
                                    setFeedbackMessage={setFeedbackMessage}
                                    errors={errors}
                                    setErrors={setErrors}
                                />
                            </div>

                            {errors.radiobuttonErrorMessage.length ? (
                                <Feiloppsummering
                                    tittel="For å gå videre må du rette opp følgende:"
                                    feil={[
                                        {
                                            skjemaelementId: 'category',
                                            feilmelding: errors.radiobuttonErrorMessage.toString(),
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
                                <CloseFeedbackHandler context="alternativ-feil-mangler" />
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

export default AlternativFeilMangler;
