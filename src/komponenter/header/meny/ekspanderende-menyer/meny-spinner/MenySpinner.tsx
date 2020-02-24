import { Normaltekst } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import React from 'react';
import './MenySpinner.less';
import Tekst from '../../../../../tekster/finn-tekst';

export const MenySpinner = () => (
    <div className={'spinner-container'}>
        <Normaltekst><Tekst id={'meny-loading'}/></Normaltekst>
        <NavFrontendSpinner/>
    </div>
);
