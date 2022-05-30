import React from 'react';
import { BodyShort } from '@navikt/ds-react';

import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import Tekst from 'tekster/finn-tekst';

export const Navn = () => {
    const { authenticated, name } = useSelector((state: AppState) => state.innloggingsstatus.data);
    return authenticated ? (
        <BodyShort>
            <b>
                <Tekst id="logget-inn-som" />
            </b>
            {` `}
            {name}
        </BodyShort>
    ) : null;
};

export default Navn;
