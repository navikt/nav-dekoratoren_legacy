import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Tekst from 'tekster/finn-tekst';
import './MenySpinner.less';

const MenySpinner = () => (
    <div className={'spinner-container'}>
        <Normaltekst>
            <Tekst id={'meny-loading'} />
        </Normaltekst>
        <NavFrontendSpinner className={'hovedmeny-spinner'} type="M" />
    </div>
);

export default MenySpinner;
