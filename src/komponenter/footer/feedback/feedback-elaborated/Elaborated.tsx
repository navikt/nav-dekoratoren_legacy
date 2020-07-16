import React, { useState, Fragment } from 'react';
import { Textarea, RadioGruppe, Radio } from 'nav-frontend-skjema';
import { Element, Ingress } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import Tekst from 'tekster/finn-tekst';
import { verifyWindowObj } from 'utils/Environment';
import ThankYou from '../feedback-thank-you/ThankYou';
import './Elaborated.less';

const { logAmplitudeEvent } = verifyWindowObj()
    ? require('utils/amplitude')
    : () => null;

const Elaborated = () => {
    const [errorTitle, setErrorTitle] = useState(String);
    const [errorMessage, setErrorMessage] = useState(String);
    const [radiobuttonErrorMessage, setRadiobuttonErrorMessage] = useState(
        String
    );
/*     const [buttonPressed, setButtonPressed] = useState({
        submitButton: false,
    });

    const userPressedSubmit = (evt:any) => {
        setButtonPressed({
            submitButton: true,
        });
        // logAmplitudeEvent('avgitt_svar', {})
    }; */

    const submitFeedback = (evt: any) => {
        evt.preventDefault();
        logAmplitudeEvent('tilbakemelding_mangler', { svar: errorTitle });

        if (!errorTitle.length) {
            setRadiobuttonErrorMessage('Du må velge et alternativ');
        } else {
            setRadiobuttonErrorMessage('');

            const report = {
                errorTitle: errorTitle,
                errorMessage: errorMessage,
            };
            console.log(report);
        }
    };

    return (
        <div className="eloborated-container">
{/*              {!buttonPressed.submitButton 
             ? (
                <Fragment> */}
                    <Ingress>
                        <Tekst id="rapporter-om-feil-mangler" />
                    </Ingress>

                    <form onSubmit={submitFeedback} className="content">
                        <Element className="tekst">
                            {' '}
                            Type feil eller mangel{' '}
                        </Element>

                        <RadioGruppe
                            feil={radiobuttonErrorMessage}
                            // @ts-ignore
                            onChange={(e) => setErrorTitle(e.target.value)}
                            checked={errorTitle}
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

                        <div>
                            <Element className="tekst">
                                <Tekst id="din-tilbakemelding" />
                            </Element>

                            <div className="advarsel">
                                <Alertstripe type="advarsel">
                                    <Tekst id="advarsel-om-personopplysninger" />
                                </Alertstripe>
                            </div>

                            <Textarea
                                value={errorMessage}
                                onChange={(e) =>
                                    setErrorMessage(e.target.value)
                                }
                            />
                            <div className="submit-knapp">
                                <Hovedknapp
                                    htmlType="submit"
                                    /* onClick={userPressedSubmit} */
                                >
                                    <Tekst id="send-inn-feilrapport" />
                                </Hovedknapp>
                            </div>
                        </div>
                    </form>
{/*                 </Fragment>
             ) : null}

            {buttonPressed.submitButton && errorMessage.length && errorTitle.length ? (
                <ThankYou />
            ) : null} */}
        </div>
    );
};

export default Elaborated;