import React, { useState, useEffect } from 'react';
import { CheckboksPanelGruppe, Textarea } from 'nav-frontend-skjema';
import './PartialNo.less';
import { Element, Ingress } from 'nav-frontend-typografi';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import Tekst from 'tekster/finn-tekst';
import { CheckboxGruppe, Checkbox } from 'nav-frontend-skjema';
import { verifyWindowObj } from 'utils/Environment';
import Alertstripe from 'nav-frontend-alertstriper';

const { logAmplitudeEvent } = verifyWindowObj()
    ? require('utils/amplitude')
    : () => null;

const PartialNo = (props: any) => {
    const [feedbackTitle, setFeedbackTitle] = useState<string[]>([]);
    const [feedbackMessage, setFeedbackMessage] = useState(String);
    let feedbackTitles = [...feedbackTitle];

    const onClickAarsak = (evt: any) => {
        feedbackTitles.includes(evt.target.value)
            ? (feedbackTitles = feedbackTitles.filter((e) => e !== evt.target.value))
            : feedbackTitles.push(evt.target.value);

        setFeedbackTitle(feedbackTitles);
    };

    const submitFeedback = (evt: any) => {
        evt.preventDefault();

        const report = {
            feedbackMessage: feedbackMessage,
            feedbackTitles: feedbackTitles,
        };

        console.log(report);
    };

    return (
        <div className="partialno-container">
            <Ingress>
                <Tekst id="send-undersokelse-takk" />
            </Ingress>

            <form onSubmit={submitFeedback} className="content">
                <CheckboxGruppe
                    // @ts-ignore
                    onChange={(e) => onClickAarsak(e)}
                    legend="Gi din vurdering av informasjonen på siden"
                >
                    <Checkbox
                        label={'Lite oversiktlig'}
                        value="lite-oversiktlig"
                    />
                    <Checkbox
                        label={'Lite forståelig'}
                        value="lite-forstaaelig"
                    />
                    <Checkbox
                        label={'Lite relevant informasjon'}
                        value="lite-relevant"
                    />
                    <Checkbox label={'Villedende'} value="villedende" />
                </CheckboxGruppe>

                <div className="content">
                    <Element>Noe annet? Spesifiser gjerne nedenfor.</Element>

                    <div className="advarsel">
                        <Alertstripe type="advarsel">
                            <Tekst id="advarsel-om-personopplysninger" />
                        </Alertstripe>
                    </div>

                    <Textarea
                        value={feedbackMessage}
                        onChange={(e) => setFeedbackMessage(e.target.value)}
                    />

                    <div className="submit-knapp">
                        <Hovedknapp htmlType="submit">Send inn</Hovedknapp>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PartialNo;
