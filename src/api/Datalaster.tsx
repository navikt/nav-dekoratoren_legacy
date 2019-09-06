import * as React from 'react';
import Spinner from 'nav-frontend-spinner';
import { Status, DataElement, DatalasterProps } from './api';

const harStatus = (dataElement: DataElement, status: Status): boolean => {
    return dataElement.status === status;
};

const Datalaster = ({
    avhengigheter,
    ventPa,
    children,
    feilmeldingId,
}: DatalasterProps) => {
    const feilmelding = feilmeldingId
        ? feilmeldingId
        : 'feilmelding-tekniskfefil';

    if (
        avhengigheter.every(a => harStatus(a, Status.OK)) &&
        (!ventPa ||
            ventPa.every(
                a => harStatus(a, Status.OK) || harStatus(a, Status.FEILET)
            ))
    ) {
        return children;
    } else if (avhengigheter.some(a => harStatus(a, Status.FEILET))) {
        console.log(
            'Det har dessverre oppstått en feil med innloggingslinjen. Vi jobber med å få løst problemet.'
        );
        return children;
    }
    return <Spinner type="S" />;
};

export default Datalaster;
