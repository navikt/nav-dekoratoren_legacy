import React, { useState } from 'react';
import { Textarea, RadioPanelGruppe } from 'nav-frontend-skjema';
import './Elaborated.less';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import gatherUserInformation from 'utils/user-information';
import Tekst from 'tekster/finn-tekst';

const Elaborated = () => {
    const [errorTitle, setErrorTitle] = useState();
    const [errorMessage, setErrorMessage] = useState(String);

    const submitFeedback = (evt: any) => {
        evt.preventDefault();

        const report = {
            errorTitle: errorTitle,
            errorMessage: errorMessage,
            clientInformation: gatherUserInformation(navigator),
        };

        console.log(report);
    };

    return (
        <div className="elaborated-wrapper">
            <Innholdstittel>
                <Tekst id="rapporter-om-feil-mangler" />
            </Innholdstittel>

            <form onSubmit={submitFeedback}>
                <RadioPanelGruppe
                    name="errorTitle"
                    legend="Type feil eller mangel"
                    radios={[
                        {
                            label: 'Informasjon',
                            value: 'informasjon',
                            id: 'informasjon',
                        },
                        {
                            label: 'Ytelse',
                            value: 'ytelse',
                            id: 'ytelse',
                        },
                        {
                            label: 'Utseende',
                            value: 'utseende',
                            id: 'utseende',
                        },
                        {
                            label: 'Bug',
                            value: 'bug',
                            id: 'bug',
                        },
                        {
                            label: 'Annet',
                            value: 'annet',
                            id: 'annet',
                        },
                    ]}
                    onChange={(e) => setErrorTitle(e.target.value)}
                    checked={errorTitle}
                />

                <Undertittel>
                    <Tekst id="din-tilbakemelding" />
                </Undertittel>

                <Alertstripe type="advarsel">
                    <Tekst id="advarsel-om-personopplysninger" />
                </Alertstripe>

                <Textarea
                    value={errorMessage}
                    onChange={(e) => setErrorMessage(e.target.value)}
                />

                <Hovedknapp htmlType="submit">
                    <Tekst id="send-inn-feilrapport" />
                </Hovedknapp>
            </form>
        </div>
    );
};

export default Elaborated;
