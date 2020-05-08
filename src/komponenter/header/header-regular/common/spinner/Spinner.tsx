import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Tekst from 'tekster/finn-tekst';
import './Spinner.less';

type Props = {
    tekstId?: string;
};

const Spinner = ({ tekstId }: Props) => (
    <div className={'spinner-container'}>
        {tekstId && (
            <Normaltekst>
                <Tekst id={tekstId} />
            </Normaltekst>
        )}
        <NavFrontendSpinner className={'dekorator-spinner'} />
    </div>
);

export default Spinner;
