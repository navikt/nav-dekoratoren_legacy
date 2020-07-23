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

    const [thankYouMessage, setThankYouMessage] = useState(false);

    const [radiobuttonErrorMessage, setRadiobuttonErrorMessage] = useState(
        String
    );

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
        console.log(category);
    }, [category]);

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
                                    label={'Teknisk feil'}
                                    name="feil"
                                    value="teknisk feil"
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                />
                                <Radio
                                    label={'Feil informasjon'}
                                    name="feil"
                                    value="feil informasjon"
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                />
                                <Radio
                                    label={
                                        'Feil på siden ved bruk av skjermleser eller annet hjelpemiddel'
                                    }
                                    name="feil"
                                    value="skjermleser"
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                />
                                <Radio
                                    label={'Annet'}
                                    name="feil"
                                    value="annet"
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                />
                            </RadioGruppe>

                            <div className="knapper">
                                <div className="send-inn">
                                    <Hovedknapp
                                        htmlType="submit"
                                        className="reset-knapp">
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
