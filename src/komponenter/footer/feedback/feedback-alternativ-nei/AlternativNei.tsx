import React, { useState, ChangeEvent, Fragment } from 'react';
import { Ingress, Element } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import Tekst from 'tekster/finn-tekst';
import { CheckboxGruppe, Checkbox } from 'nav-frontend-skjema';
import sendFeedbackNo from './send-feedback-no';
import Thankyou from '../feedback-thank-you/ThankYou';
import CloseFeedbackHandler from '../common/CloseFeedbackHandler';
import './AlternativNei.less';

const AlternativNei = () => {
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

                            <CheckboxGruppe feil={radiobuttonErrorMessage}>
                                <Checkbox
                                    label={<Tekst id="lite-relevant-info" />}
                                    value="Lite relevant informasjon"
                                    onChange={(e) => onClickAarsak(e)}
                                />
                                <Checkbox
                                    label={<Tekst id="lite-forstaelig" />}
                                    value="Lite forståelig"
                                    onChange={(e) => onClickAarsak(e)}
                                />
                                <Checkbox
                                    label={<Tekst id="lite-oversiktlig" />}
                                    value="Lite oversiktlig"
                                    onChange={(e) => onClickAarsak(e)}
                                />
                            </CheckboxGruppe>
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
