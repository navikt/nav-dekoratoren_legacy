import * as React from 'react';
import Spinner from 'nav-frontend-spinner';

export enum Status {
    OK = 'OK',
    FEILET = 'FEILET',
    PENDING = 'PENDING',
    IKKE_STARTET = 'IKKE_STARTET',
    RELOADING = 'RELOADING',
}
export interface DataElement {
    status: Status;
}

interface DatalasterProps {
    avhengigheter: DataElement[];
    ventPa?: DataElement[];
    children: React.ReactElement<any>; // tslint:disable-line:no-any
    feilmeldingId?: string;
}

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
        // Alle avhengigheter lastet inn uten problemer og ventPa er ferdig (enten OK eller FEILET)
        return children;
    } else if (avhengigheter.some(a => harStatus(a, Status.FEILET))) {
        console.log(
            'det har dessverre oppstått en feil med innloggingslinjen. Vi jobber med å få løst problemet.'
        );
        return children;
    }
    return <Spinner type="XXL" />;
};

export default Datalaster;
