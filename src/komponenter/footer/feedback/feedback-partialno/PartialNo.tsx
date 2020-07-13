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
    const [aarsak, setAarsak] = useState<string[]>([]);
    const [negMessage, setNegMessage] = useState(String);
    let aarsaker = [...aarsak];

    const onClickAarsak = (evt: any) => {
        aarsaker.includes(evt.target.value)
            ? (aarsaker = aarsaker.filter((e) => e !== evt.target.value))
            : aarsaker.push(evt.target.value);

        setAarsak(aarsaker);
    };

    const submitFeedback = (evt: any) => {
        evt.preventDefault();

        const report = {
            negMessage: negMessage,
            aarsaker: aarsaker,
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
                    <Checkbox label={'Lite oversiktlig'} value="neg1" />
                    <Checkbox label={'Lite forståelig'} value="neg2" />
                    <Checkbox
                        label={'Lite relevant informasjon'}
                        value="neg3"
                    />
                    <Checkbox label={'Villedende'} value="neg4" />
                </CheckboxGruppe>

                <div className="content">
                    <Element>Noe annet? Spesifiser gjerne nedenfor.</Element>

                    <Textarea
                        value={negMessage}
                        onChange={(e) => setNegMessage(e.target.value)}
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
