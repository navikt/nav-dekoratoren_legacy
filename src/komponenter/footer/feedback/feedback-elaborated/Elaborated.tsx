import React, { useState } from 'react';
import { Textarea } from 'nav-frontend-skjema';
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
            clientInformation: gatherUserInformation(navigator)
        };

        console.log(report);
    };

    const ErrorTitleEntry = (props: any) => (
        <Flatknapp
            value={props.tittel}
            onClick={(e) => setErrorTitle(e.target.value)}
        >
            {props.tittel}
        </Flatknapp>
    );

    return (
        <div className="elaborated-wrapper">
            <Innholdstittel>
                <Tekst id="rapporter-om-feil-mangler" />
            </Innholdstittel>

            <form onSubmit={submitFeedback}>
                <Ekspanderbartpanel tittel={'Velg type feil eller mangel'}>
                    <div className={'errorTitlesContainer'}>
                        <ErrorTitleEntry tittel={'Informasjon'} />
                        <ErrorTitleEntry tittel={'Ytelse'} />
                        <ErrorTitleEntry tittel={'Utseende'} />
                        <ErrorTitleEntry tittel={'Bug'} />
                        <ErrorTitleEntry tittel={'Annet'} />
                    </div>
                </Ekspanderbartpanel>

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
