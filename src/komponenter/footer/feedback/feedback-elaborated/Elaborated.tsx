import React, { useState, Fragment, useContext } from 'react';
import { RadioGruppe, Radio } from 'nav-frontend-skjema';
import { Element, Ingress } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import Tekst from 'tekster/finn-tekst';
import { verifyWindowObj } from 'utils/Environment';
import FeedbackMessage from '../common/feedback-message/FeedbackMessage';
import sendFeedbackReport from './send-feedback-report';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import Thankyou from '../feedback-thank-you/ThankYou';
import CloseFeedbackHandler from '../common/CloseFeedbackHandler';
import { CloseFeedbackContext } from '../common/CloseFeedbackContext';
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
                                label={'Teknisk feil'}
                                name="feil"
                                value="TEKNISK_FEIL"
                            />
                            <Radio
                                label={'Feil informasjon'}
                                name="feil"
                                value="INFORMASJON"
                            />
                            <Radio
                                label={
                                    'Feil på siden ved bruk av skjermleser eller annet hjelpemiddel'
                                }
                                name="feil"
                                value="HJELPEMIDDEL"
                            />
                            <Radio label={'Annet'} name="feil" value="ANNET" />
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
