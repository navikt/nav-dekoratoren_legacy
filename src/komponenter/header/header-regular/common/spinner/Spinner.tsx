import React, { useId } from 'react';
import Tekst from 'tekster/finn-tekst';
import { BodyShort, Loader } from '@navikt/ds-react';
import './Spinner.less';

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
