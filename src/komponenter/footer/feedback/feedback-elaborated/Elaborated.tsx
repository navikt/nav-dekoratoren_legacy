import React, { useState, Fragment, useContext } from 'react';
import { RadioGruppe, Radio } from 'nav-frontend-skjema';
import { Element, Ingress } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import Tekst from 'tekster/finn-tekst';
import { verifyWindowObj } from 'utils/Environment';
import FeedbackMessage from '../common/FeedbackMessage';
import sendFeedbackReport from './send-feedback-report';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import Thankyou from '../feedback-thank-you/ThankYou';
import CloseFeedbackHandler from '../common/CloseFeedbackHandler';
import { CloseFeedbackContext } from '../common/CloseFeedbackContext';
import './Elaborated.less';

const { logAmplitudeEvent } = verifyWindowObj()
    ? require('utils/amplitude')
    : () => null;

const Elaborated = () => {
    const [category, setCategory] = useState(String);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const closeFeedback = useContext(CloseFeedbackContext);

    const [radiobuttonErrorMessage, setRadiobuttonErrorMessage] = useState(
        String
    );

    const [thankYouMessage, setThankYouMessage] = useState(false);

    const { language } = useSelector((state: AppState) => state.language);

    const submitFeedback = (evt: any) => {
        evt.preventDefault();
        //logAmplitudeEvent('tilbakemelding_mangler', { svar: category });

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
                            <CloseFeedbackHandler context="elaborated"/>
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

                            <div className="advarsel">
                                <Alertstripe type="advarsel">
                                    <Tekst id="advarsel-om-personopplysninger" />
                                </Alertstripe>
                            </div>

                            <FeedbackMessage
                                feedbackMessage={feedbackMessage}
                                setFeedbackMessage={setFeedbackMessage}
                            />
                        </div>
                    </form>
                    <div className="submit-knapp">
                        <Hovedknapp htmlType="submit">
                            <Tekst id="send-inn-feilrapport" />
                        </Hovedknapp>
                    </div>
                </div>
            ) : (
                <Thankyou />
            )}
        </Fragment>
    );
};

export default Elaborated;
