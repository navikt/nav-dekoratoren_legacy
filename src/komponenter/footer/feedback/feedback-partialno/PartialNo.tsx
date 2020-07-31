import React, { useState, Fragment } from 'react';
import { Element, Ingress } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import Tekst from 'tekster/finn-tekst';
import { CheckboxGruppe, Checkbox } from 'nav-frontend-skjema';
import FeedbackMessage from '../common/feedback-message/FeedbackMessage';
import sendFeedbackNo from './send-feedback-no';
import Thankyou from '../feedback-thank-you/ThankYou';
import CloseFeedbackHandler from '../common/CloseFeedbackHandler';
import './PartialNo.less';

const PartialNo = () => {
    const [feedbackTitle, setFeedbackTitle] = useState<string[]>([]);

    const [thankYouMessage, setThankYouMessage] = useState(false);

    const [radiobuttonErrorMessage, setRadiobuttonErrorMessage] = useState(
        String
    );

    let feedbackTitles = [...feedbackTitle];

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
            setRadiobuttonErrorMessage('Du må velge et alternativ');
        } else {
            setRadiobuttonErrorMessage('');
            sendFeedbackNo(feedbackTitle);
            setThankYouMessage(true);
        }
    };

    return (
        <Fragment>
            {!thankYouMessage ? (
                <div className="partialno-wrapper">
                    <div className="overskrift-container">
                        <Ingress>
                            <Tekst id="send-undersokelse-takk" />
                        </Ingress>
                    </div>

                    <div className="partialno-container">
                        <form onSubmit={submitFeedback}>
                            <Element className="sub-overskrift">
                                <Tekst id="gi-din-vurdering-av-informasjon" />
                            </Element>

                            <CheckboxGruppe feil={radiobuttonErrorMessage}>
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

                            <div className="no-content">
                                <Element>
                                    <Tekst id="hva-lette-du-etter-spørsmål" />
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
                                <CloseFeedbackHandler context="partialno" />
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

export default PartialNo;
