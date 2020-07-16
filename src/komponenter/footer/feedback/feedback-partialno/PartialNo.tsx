import React, { useState } from 'react';
import './PartialNo.less';
import { Element, Ingress } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import Tekst from 'tekster/finn-tekst';
import { CheckboxGruppe, Checkbox } from 'nav-frontend-skjema';
import { verifyWindowObj } from 'utils/Environment';
import Alertstripe from 'nav-frontend-alertstriper';
import FeedbackMessage from '../common/FeedbackMessage';
import sendFeedbackNo from './send-feedback-no';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { set } from 'react-ga';
import Thankyou from '../feedback-thank-you/ThankYou';

const { logAmplitudeEvent } = verifyWindowObj()
    ? require('utils/amplitude')
    : () => null;

const PartialNo = (props: any) => {
    const [feedbackTitle, setFeedbackTitle] = useState<string[]>([]);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const { language } = useSelector((state: AppState) => state.language);

    const [thankYouMessage, setThankYouMessage] = useState(false);

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

        sendFeedbackNo(feedbackTitle, feedbackMessage, language.toLowerCase());
        setThankYouMessage(true);
    };

    return (
        <div>
            {!thankYouMessage ? (
                <div className="partialno-container">
                    <Ingress>
                        <Tekst id="send-undersokelse-takk" />
                    </Ingress>

                    <form onSubmit={submitFeedback} className="content">
                        <CheckboxGruppe
                            // @ts-ignore
                            onChange={(e) => onClickAarsak(e)}
                            legend="Gi din vurdering av informasjonen på siden"
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

                        <div className="content">
                            <Element>
                                Noe annet? Spesifiser gjerne nedenfor.
                            </Element>

                            <div className="advarsel">
                                <Alertstripe type="advarsel">
                                    <Tekst id="advarsel-om-personopplysninger" />
                                </Alertstripe>
                            </div>

                            <FeedbackMessage
                                feedbackMessage={feedbackMessage}
                                setFeedbackMessage={setFeedbackMessage}
                            />

                            <div className="submit-knapp">
                                <Hovedknapp htmlType="submit">
                                    Send inn
                                </Hovedknapp>
                            </div>
                        </div>
                    </form>
                </div>
            ) : <Thankyou />}
        </div>
    );
};

export default PartialNo;
