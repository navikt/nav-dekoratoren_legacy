import React, { useState, Fragment, useContext } from 'react';
import { RadioGruppe, Radio } from 'nav-frontend-skjema';
import { Element, Ingress } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import Tekst from 'tekster/finn-tekst';
import FeedbackMessage from '../common/feedback-message/FeedbackMessage';
import sendFeedbackReport from './send-feedback-report';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import Thankyou from '../feedback-thank-you/ThankYou';
import CloseFeedbackHandler from '../common/CloseFeedbackHandler';
import './Elaborated.less';

const Elaborated = () => {
    const [category, setCategory] = useState(String);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const [radiobuttonErrorMessage, setRadiobuttonErrorMessage] = useState(
        String
    );

    const [thankYouMessage, setThankYouMessage] = useState(false);

    const { language } = useSelector((state: AppState) => state.language);

    const submitFeedback = (evt: any) => {
        evt.preventDefault();

        if (!category.length) {
            setRadiobuttonErrorMessage('Du må velge et alternativ');
        } else {
            setRadiobuttonErrorMessage('');
            sendFeedbackReport(
                category,
                feedbackMessage,
                language.toLowerCase()
            );
            setThankYouMessage(true);
        }
    };

    return (
        <Fragment>
            {!thankYouMessage ? (
                <div className="elaborated-wrapper">
                    <div className="overskrift-container">
                        <Ingress>
                            <Tekst id="rapporter-om-feil-mangler" />
                        </Ingress>
                    </div>

                    <div className="elaborated-container">
                        <form onSubmit={submitFeedback}>
                            <Element className="sub-overskrift">
                                <Tekst id="velg-type-feil-mangler" />
                            </Element>

                            <RadioGruppe feil={radiobuttonErrorMessage}>
                                <Radio
                                    label={<Tekst id="teknisk-feil" />}
                                    name="feil"
                                    value="teknisk feil"
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                />
                                <Radio
                                    label={<Tekst id="feil-informasjon" />}
                                    name="feil"
                                    value="feil informasjon"
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

                            <div className="elaborated-content">
                                <Element className="tekst">
                                    <Tekst id="din-tilbakemelding" />
                                </Element>

                                <FeedbackMessage
                                    feedbackMessage={feedbackMessage}
                                    setFeedbackMessage={setFeedbackMessage}
                                />
                            </div>

                            <div className="knapper">
                                <div className="send-inn">
                                    <Hovedknapp
                                        htmlType="submit"
                                        className="reset-knapp"
                                    >
                                        <Tekst id="send-inn-feilrapport" />
                                    </Hovedknapp>
                                </div>
                                <CloseFeedbackHandler context="elaborated" />
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <Thankyou />
            )}
        </Fragment>
    );
};

export default Elaborated;
