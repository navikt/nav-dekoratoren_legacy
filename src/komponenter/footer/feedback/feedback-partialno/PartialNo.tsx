import React, { useState, useEffect } from 'react';
import {CheckboksPanelGruppe, Textarea} from "nav-frontend-skjema";
import './PartialNo.less'; 
import { Innholdstittel, Element } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import Alertstripe from 'nav-frontend-alertstriper';
import Tekst from 'tekster/finn-tekst';


const PartialNo = (props: any) => {

    const [aarsaker, setAarsaker] = useState<string[]>([]);
    const [negMessage, setNegMessage] = useState(String);
 //   const [checkboxError, setCheckboxError] = useState(String);

    useEffect(() => {
        setAarsaker(props.aarsaker);
    }, [props]);

    const submitFeedback = (evt: any) => {
        evt.preventDefault();

//        {!checkboxError.length ? setCheckboxError('upsi') : setCheckboxError('')}

        const report = {
            negMessage: negMessage,
  //          aarsaker: aarsaker,
        };

        console.log(report) 
    };

    return (
        <div className="partialno-container">
        <Innholdstittel className="partialno_tekst"> Takk for tilbakemeldingen! </Innholdstittel>

        <form onSubmit={submitFeedback}>
            <CheckboksPanelGruppe 
            legend={'Hva var galt?'} 
            className="partialno_tekst"
//            feil={checkboxError}
            checkboxes={[
                { label: 'Lite oversiktlig', value: 'neg1', id: 'neg1id' },
                { label: 'Lite forståelig', value: 'neg2', id: 'neg2id' },
                { label: 'Lite relevant informasjon', value: 'neg3', id: 'neg3id' },
                { label: 'Villedende', value: 'neg4', id: 'neg4id' }
            ]}
            onChange={(e) => setAarsaker(e.target.value)}
            />

            <Element> Noe annet? Spesifiser gjerne nedenfor. </Element> 

            <Textarea
                value={negMessage}
                onChange={(e) => setNegMessage(e.target.value)}
            />

            <Knapp htmlType="submit"> Send inn </Knapp>
        </form>
        </div>
    )
}

export default PartialNo;