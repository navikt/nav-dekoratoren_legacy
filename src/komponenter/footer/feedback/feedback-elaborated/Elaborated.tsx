import React, { useState } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import './Elaborated.less';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';

const Elaborated = () => {
    const [errorTitle, setErrorTitle] = useState();
    const [errorMessage, setErrorMessage] = useState(String);

    const submitFeedback = (evt: any) => {
        evt.preventDefault();

        const report = {
            title: errorTitle,
            message: errorMessage,
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
            <Innholdstittel>Rapporter feil eller mangler</Innholdstittel>

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

                <Undertittel>Din tilbakemelding</Undertittel>

                <Alertstripe type="advarsel">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis tincidunt leo vel nisl venenatis, nec porttitor ante
                    faucibus. Donec at eros elementum, mollis ipsum vitae,
                    feugiat orci. Sed suscipit mi ut varius rhoncus.
                </Alertstripe>

                <Textarea
                    value={errorMessage}
                    onChange={(e) => setErrorMessage(e.target.value)}
                />

                <Hovedknapp htmlType="submit">Send inn</Hovedknapp>
            </form>
        </div>
    );
};

export default Elaborated;
