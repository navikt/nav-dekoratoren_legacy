import React from 'react';
import Tekst from 'tekster/finn-tekst';
import './Spinner.less';
import { BodyShort, Loader, useId } from '@navikt/ds-react';

type Props = {
    tekstId?: string;
    className?: string;
};

const Spinner = ({ tekstId, className }: Props) => {
    const id = useId();

    return (
        <div className={`spinner-container${className ? ` ${className}` : ''}`}>
            {tekstId && (
                <BodyShort>
                    <Tekst id={tekstId} />
                </BodyShort>
            )}
            <Loader className={'dekorator-spinner'} id={id} />
        </div>
    );
};

export default Spinner;
