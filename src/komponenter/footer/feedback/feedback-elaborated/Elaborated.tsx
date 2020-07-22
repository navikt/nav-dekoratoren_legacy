import React, { useState, Fragment, useEffect } from 'react';
import { RadioGruppe, Radio } from 'nav-frontend-skjema';
import { Element, Ingress } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import Tekst from 'tekster/finn-tekst';
import sendFeedbackReport from './send-feedback-report';
import Thankyou from '../feedback-thank-you/ThankYou';
import CloseFeedbackHandler from '../common/CloseFeedbackHandler';
import './Elaborated.less';

const Elaborated = () => {
    const [category, setCategory] = useState(String);

    const [radiobuttonErrorMessage, setRadiobuttonErrorMessage] = useState(
        String
    );

    const [thankYouMessage, setThankYouMessage] = useState(false);

    const submitFeedback = (evt: any) => {
        evt.preventDefault();

        if (!category.length) {
            setRadiobuttonErrorMessage('Du må velge et alternativ');
        } else {
            setRadiobuttonErrorMessage('');
            sendFeedbackReport(category);
            setThankYouMessage(true);
        }
    };

    useEffect(() => {
        console.log(category)

    }, [category])

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
                        <Element className="radioknapp-gruppe-overskrift">
                            <Tekst id="velg-type-feil-mangler" />
                        </Element>

                        <RadioGruppe
                            feil={radiobuttonErrorMessage}
                        >
                            <Radio
                                label={'Teknisk feil'}
                                name="feil"
                                value="teknisk feil"
                                onChange={(e) => setCategory(e.target.value)}
                            />
                            <Radio
                                label={'Feil informasjon'}
                                name="feil"
                                value="feil informasjon"
                                onChange={(e) => setCategory(e.target.value)}
                            />
                            <Radio
                                label={
                                    'Feil på siden ved bruk av skjermleser eller annet hjelpemiddel'
                                }
                                name="feil"
                                value="skjermleser"
                                onChange={(e) => setCategory(e.target.value)}
                            />
                            <Radio
                                label={'Annet'}
                                name="feil"
                                value="annet"
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </RadioGruppe>

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
