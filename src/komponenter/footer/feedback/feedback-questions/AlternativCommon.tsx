import React, { useState } from 'react';
import Tekst from 'tekster/finn-tekst';
import './Alternativ.less';
import { Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { Environment } from '../../../../store/reducers/environment-duck';


export const personvernAdvarsel = (
    <Normaltekst>
        <Tekst id="advarsel-om-personopplysninger" />
        <br/>
        <Tekst id="advarsel-om-svar" />
    </Normaltekst>
)

export const andreSider = (environment: Environment) => {
    return (<Normaltekst className="alternativ-notis">
        Ønsker du informasjon om saken din? <Lenke href={environment.DITT_NAV_URL}>Logg inn på Ditt NAV.</Lenke> <br />
        Du kan også <Lenke href={`${environment.XP_BASE_URL}/person/kontakt-oss`}>skrive eller ringe til NAV.</Lenke>
        </Normaltekst>);
}
