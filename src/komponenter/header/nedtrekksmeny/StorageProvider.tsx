import React from 'react';
import { Person } from '../menyLenker/Person';
import { Bedrift } from '../menyLenker/Bedrift';
import { Samhandling } from '../menyLenker/Samhandling';

export const NAVHEADER = 'NAVHEADER';

export interface MenyValg {
    seksjon: MenuValue;
    menyLenker: {
        tittel: string;
        lenker: { tittel: string; url: string }[];
    }[];
}

export enum MenuValue {
    PRIVATPERSON = 'PRIVATPERSON',
    BEDRIFT = 'BEDRIFT',
    SAMHANDLING = 'SAMHANDLING',
}

export const getMeny = (): {
    seksjon: MenuValue;
    menyLenker: {
        tittel: string;
        lenker: { tittel: string; url: string }[];
    }[];
} => {
    const locationPath = window.location.pathname.split('/')[3];

    if (locationPath !== undefined) {
        const windowPathname = sjekkUriAndDispatch(
            window.location.pathname.split('/')[3]
        );
        if (windowPathname[0] && windowPathname[2]) {
            sessionStorage.setItem(NAVHEADER, windowPathname[1]);
            return {
                seksjon: windowPathname[1],
                menyLenker: windowPathname[2],
            };
        }
    }
    const storage = sessionStorage.getItem(NAVHEADER);
    return storage
        ? mapMenuLinks(storage)
        : { seksjon: MenuValue.PRIVATPERSON, menyLenker: Person };
};

export const mapMenuLinks = (type: string): MenyValg => {
    switch (type) {
        case 'PRIVATPERSON':
            return { seksjon: MenuValue.PRIVATPERSON, menyLenker: Person };
        case 'BEDRIFT':
            return { seksjon: MenuValue.BEDRIFT, menyLenker: Bedrift };
        case 'SAMHANDLING':
            return { seksjon: MenuValue.SAMHANDLING, menyLenker: Samhandling };
        default:
            return { seksjon: MenuValue.PRIVATPERSON, menyLenker: Person };
    }
};

const sjekkUriAndDispatch = (
    type: string
): [
    boolean,
    MenuValue,
    {
        tittel: string;
        lenker: { tittel: string; url: string }[];
    }[]
] => {
    if (
        type
            .toString()
            .toUpperCase()
            .includes('PERSON')
    ) {
        return [true, MenuValue.PRIVATPERSON, Person];
    } else if (
        type
            .toString()
            .toUpperCase()
            .includes('BEDRIFT')
    ) {
        return [true, MenuValue.BEDRIFT, Bedrift];
    } else if (
        type
            .toString()
            .toUpperCase()
            .includes('SAMHANDLING')
    ) {
        return [true, MenuValue.SAMHANDLING, Samhandling];
    }
    return [false, MenuValue.PRIVATPERSON, Person];
};
