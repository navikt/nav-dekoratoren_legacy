import React, { useState } from 'react';
import { Ingress, Element } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import Tekst from 'tekster/finn-tekst';
import { CheckboxGruppe, Checkbox } from 'nav-frontend-skjema';
import sendFeedbackNo from './send-feedback-no';
import Thankyou from '../feedback-thank-you/ThankYou';
import CloseFeedbackHandler from '../common/CloseFeedbackHandler';
import './PartialNo.less';

const PartialNo = (props: any) => {
    const [feedbackTitle, setFeedbackTitle] = useState<string[]>([]);

    const [thankYouMessage, setThankYouMessage] = useState(false);

    const [radiobuttonErrorMessage, setRadiobuttonErrorMessage] = useState(
        String
    );

    let feedbackTitles = [...feedbackTitle];

    const onClickAarsak = (evt: any) => {
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
        <div className="partialno-container">
            {!thankYouMessage ? (
                <div >
                    <div className="overskrift-container">
                        <Ingress>
                            <Tekst id="send-undersokelse-takk" />
                        </Ingress>

                        <div className="kryssut-knapp">
                            <CloseFeedbackHandler context="partialno" />
                        </div>
                    </div>

                    <Element className="checkbox-gruppe-overskrift">
                        <Tekst id="gi-din-vurdering-av-informasjon" />
                    </Element>

                    <form onSubmit={submitFeedback} className="no-content">
                        <CheckboxGruppe
                            // @ts-ignore
                            onChange={(e) => onClickAarsak(e)}
                            feil={radiobuttonErrorMessage}
                        >
                            <Checkbox
                                label={'Lite oversiktlig'}
                                value="Lite oversiktlig"
                            />
                            <Checkbox
                                label={'Lite forståelig'}
                                value="Lite forståelig"
                            />
                            <Checkbox
                                label={'Lite relevant informasjon'}
                                value="Lite relevant informasjon"
                            />
                            <Checkbox label={'Villedende'} value="Villedende" />
                        </CheckboxGruppe>

                        <div className="submit-knapp">
                            <Hovedknapp htmlType="submit">
                                <Tekst id="send-inn-feilrapport" />
                            </Hovedknapp>
                        </div>
                    </form>
                </div>
            ) : (
                <Thankyou />
            )}
        </div>
    );
};

export default PartialNo;
