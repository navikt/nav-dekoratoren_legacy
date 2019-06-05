import * as React from 'react';
import Spinner from 'nav-frontend-spinner';
import AlertStripe from 'nav-frontend-alertstriper';

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

const Datalaster = ({avhengigheter, ventPa, children, feilmeldingId}: DatalasterProps) => {
    const feilmelding = feilmeldingId ? feilmeldingId : 'feilmelding-tekniskfeil';
    if (avhengigheter.every(a => harStatus(a, Status.OK)) &&
        (!ventPa ||
            ventPa.every(a => harStatus(a, Status.OK) || harStatus(a, Status.FEILET)))) {
        // Alle avhengigheter lastet inn uten problemer og ventPa er ferdig (enten OK eller FEILET)
        return children;
    } else if (avhengigheter.some(a => harStatus(a, Status.FEILET))) {
        return (
            <div className="feilmelding-container">
                <AlertStripe type="advarsel">
                    Det har dessverre oppstått en teknisk feil hos oss.
                </AlertStripe>
            </div>
        );
    }
    return <Spinner type="XXL"/>;
};

export default Datalaster;
