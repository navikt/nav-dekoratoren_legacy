import React from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Tekst from 'tekster/finn-tekst';
import './Spinner.less';
import { BodyShort } from '@navikt/ds-react';

type Props = {
    tekstId?: string;
    className?: string;
};

const Spinner = ({ tekstId, className }: Props) => (
    <div className={`spinner-container${className ? ` ${className}` : ''}`}>
        {tekstId && (
            <BodyShort>
                <Tekst id={tekstId} />
            </BodyShort>
        )}
        <NavFrontendSpinner className={'dekorator-spinner'} />
    </div>
);

export default Spinner;
