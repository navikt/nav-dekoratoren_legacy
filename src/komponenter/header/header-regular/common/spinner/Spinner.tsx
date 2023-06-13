import React, { useId } from 'react';
import Tekst from 'tekster/finn-tekst';
import { BodyShort, Loader } from '@navikt/ds-react';
import style from './Spinner.module.scss';
import { LangKey } from 'tekster/ledetekster';

type Props = {
    tekstId?: LangKey;
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
            <Loader className={style.dekoratorSpinner} id={id} />
        </div>
    );
};

export default Spinner;
