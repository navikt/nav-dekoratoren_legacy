import React, { useState, Fragment } from 'react';
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
                                value="bug"
                            />
                            <Radio
                                label={'Feil informasjon'}
                                name="feil"
                                value="informasjon"
                            />
                            <Radio
                                label={
                                    'Feil på siden ved bruk av skjermleser eller annet hjelpemiddel'
                                }
                                name="feil"
                                value="skjermleser"
                            />
                            <Radio label={'Annet'} name="feil" value="annet" />
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
