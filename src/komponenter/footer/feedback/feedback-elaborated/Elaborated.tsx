import React, { useState, Fragment } from 'react';
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
                <div className="elaborated-container">
                    <div className="overskrift-container">
                        <Ingress>
                            <Tekst id="rapporter-om-feil-mangler" />
                        </Ingress>

                        <div className="kryssut-knapp">
                            <CloseFeedbackHandler context="elaborated" />
                        </div>
                    </div>

                    <form
                        onSubmit={submitFeedback}
                        className="elaborated-content"
                    >
                        <Element className="tekst">
                            <Tekst id="velg-type-feil-mangler" />
                        </Element>

                        <RadioGruppe
                            feil={radiobuttonErrorMessage}
                            // @ts-ignore
                            onChange={(e) => setCategory(e.target.value)}
                            checked={category}
                        >
                            <Radio
                                label={'Informasjon'}
                                name="feil"
                                value="informasjon"
                            />
                            <Radio
                                label={'Ytelse'}
                                name="feil"
                                value="ytelse"
                            />
                            <Radio
                                label={'Utseende'}
                                name="feil"
                                value="utseende"
                            />
                            <Radio label={'Bug'} name="feil" value="bug" />
                            <Radio label={'Annet'} name="feil" value="annet" />
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
        </Fragment>
    );
};

export default Elaborated;
