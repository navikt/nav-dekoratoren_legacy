import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Tekst from 'tekster/finn-tekst';
import './Spinner.less';

type Props = {
    tekstId?: string;
    className?: string;
};

const Spinner = ({ tekstId, className }: Props) => (
    <div className={`spinner-container${className ? ` ${className}` : ''}`}>
        {tekstId && (
            <Normaltekst>
                <Tekst id={tekstId} />
            </Normaltekst>
        )}
        <NavFrontendSpinner className={'dekorator-spinner'} />
    </div>
);

export default Spinner;
