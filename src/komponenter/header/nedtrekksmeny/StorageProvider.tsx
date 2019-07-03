import React from 'react';
import { Person } from '../menyLenker/Person';
import { Bedrift } from '../menyLenker/Bedrift';
import { Andre } from '../menyLenker/Andre';

export const NAVHEADER = 'NAVHEADER';

export type MenyValg = {
    valgtmeny: MenyVal;
    menyLenker: Object;
};

export enum MenyVal {
    PRIVATPERSON = 'PRIVATPERSON',
    BEDRIFT = 'BEDRIFT',
    SAMHANDLING = 'SAMHANDLING',
}

export const getMeny = (): MenyValg => {
    const windowPathname = sjekkUriAndDispatch(
        window.location.pathname.split('/')[1]
    );
    if (windowPathname[0]) {
        return { valgtmeny: windowPathname[1], menyLenker: windowPathname[2] };
    }
    const storage = sessionStorage.getItem(NAVHEADER);
    return storage
        ? mapMenuLinks(storage)
        : { valgtmeny: MenyVal.PRIVATPERSON, menyLenker: Person };
};

export const mapMenuLinks = (type: string): MenyValg => {
    switch (type) {
        case 'PRIVATPERSON':
            return { valgtmeny: MenyVal.PRIVATPERSON, menyLenker: Person };
        case 'BEDRIFT':
            return { valgtmeny: MenyVal.BEDRIFT, menyLenker: Bedrift };
        case 'SAMHANDLING':
            return { valgtmeny: MenyVal.SAMHANDLING, menyLenker: Andre };
        default:
            return { valgtmeny: MenyVal.PRIVATPERSON, menyLenker: Person };
    }
};

const sjekkUriAndDispatch = (type: string): [boolean, MenyVal, object] => {
    if (
        type
            .toString()
            .toUpperCase()
            .includes('PERSON')
    ) {
        return [true, MenyVal.PRIVATPERSON, Person];
    } else if (
        type
            .toString()
            .toUpperCase()
            .includes('BEDRIFT')
    ) {
        return [true, MenyVal.BEDRIFT, Bedrift];
    } else if (
        type
            .toString()
            .toUpperCase()
            .includes('SAMHANDLING')
    ) {
        return [true, MenyVal.SAMHANDLING, Andre];
    }
    return [true, MenyVal.PRIVATPERSON, Person];
};
