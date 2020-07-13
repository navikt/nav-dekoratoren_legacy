import React, { useState } from 'react';
import { Textarea, RadioPanelGruppe, Select } from 'nav-frontend-skjema';
import { Element, Undertittel, Ingress } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import gatherUserInformation from 'utils/user-information';
import Tekst from 'tekster/finn-tekst';
import './Elaborated.less';
import { RadioGruppe, Radio } from 'nav-frontend-skjema';

const Elaborated = () => {
    const [errorTitle, setErrorTitle] = useState(String);
    const [errorMessage, setErrorMessage] = useState(String);
    const [radiobuttonErrorMessage, setRadiobuttonErrorMessage] = useState(
        String
    );

    const submitFeedback = (evt: any) => {
        evt.preventDefault();

        if (!errorTitle.length) {
            setRadiobuttonErrorMessage('Du må velge et alternativ');
        } else {
            setRadiobuttonErrorMessage('');

            const report = {
                errorTitle: errorTitle,
                errorMessage: errorMessage,
                clientInformation: gatherUserInformation(navigator),
            };

            console.log(report);
        }
    };

    return (
        <div className="eloborated-container">
            <Ingress>
                <Tekst id="rapporter-om-feil-mangler" />
            </Ingress>

            <form onSubmit={submitFeedback} className="content">
                <Element className="tekst"> Type feil eller mangel </Element>

                <RadioGruppe
                    feil={radiobuttonErrorMessage}
                    onChange={(e) => setErrorTitle(e.target.value)}
                    checked={errorTitle}
                >
                    <Radio label={'Informasjon'} name="informasjon" />
                    <Radio label={'Ytelse'} name="ytelse" />
                    <Radio label={'Utseende'} name="utseende" />
                    <Radio label={'Bug'} name="bug" />
                    <Radio label={'Annet'} name="annet" />
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
                        onChange={(e) => setErrorMessage(e.target.value)}
                    />
                    <div className="submit-knapp">
                        <Hovedknapp htmlType="submit">
                            <Tekst id="send-inn-feilrapport" />
                        </Hovedknapp>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Elaborated;
