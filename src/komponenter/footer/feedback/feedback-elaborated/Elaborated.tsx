import React, { Fragment } from 'react';
import { RadioGruppe, Radio } from 'nav-frontend-skjema';

const Elaborated = () => {
    return (
        <Fragment>
            <RadioGruppe legend='Hva gikk galt?'>
                <Radio label={'Siden kræsjet'} name="feil"/>
                <Radio label={'Jeg fant ikke frem til inholdet'} name="feil"/>
            </RadioGruppe>
        </Fragment>
        
    );
};