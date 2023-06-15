import React, { useId } from 'react';
import Tekst from 'tekster/finn-tekst';
import { BodyShort, Loader } from '@navikt/ds-react';
import style from './Spinner.module.scss';

type Props = {
    tekstId?: string;
};

const Spinner = ({ tekstId }: Props) => {
    const id = useId();

    return (
        <div className={style.spinnerContainer}>
            {tekstId && (
                <BodyShort>
                    <Tekst id={tekstId} />
                </BodyShort>
            )}
            <Loader size={'3xlarge'} id={id} />
        </div>
    );
};

export default Spinner;
