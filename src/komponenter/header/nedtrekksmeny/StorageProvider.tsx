import React from 'react';
import { Person } from '../menyLenker/Person';
import { Bedrift } from '../menyLenker/Bedrift';
import { Andre } from '../menyLenker/Andre';

export const NAVHEADER = 'NAVHEADER';

export enum MenyVal {
    PRIVATPERSON = 'PRIVATPERSON',
    BEDRIFT = 'BEDRIFT',
    SAMHANDLING = 'SAMHANDLING',
}

export const getMenuStorage = (): any => {
    const windowPathname = sjekkUriAndDispatch(
        window.location.pathname.split('/')[1]
    );
    if (windowPathname[0]) {
        return windowPathname[1];
    }
    const storage = sessionStorage.getItem(NAVHEADER);
    return storage ? storage : MenyVal.PRIVATPERSON;
};

export const chooseMenubase = (): any => {
    const windowPathname = sjekkUriAndDispatch(
        window.location.pathname.split('/')[1]
    );
    if (windowPathname[1]) {
        return mapMenuLinks(windowPathname[1]);
    }
    const storage = sessionStorage.getItem(NAVHEADER);
    return storage ? mapMenuLinks(storage) : Person;
};

const mapMenuLinks = (type: any) => {
    switch (type) {
        case 'PRIVATPERSON':
            return Person;
        case 'BEDRIFT':
            return Bedrift;
        case 'SAMHANDLING':
            return Andre;
        default:
            return Person;
    }
};

const sjekkUriAndDispatch = (type: string): any => {
    if (
        type
            .toString()
            .toUpperCase()
            .includes('PERSON')
    ) {
        return [true, 'PRIVATPERSON', Person];
    } else if (
        type
            .toString()
            .toUpperCase()
            .includes('BEDRIFT')
    ) {
        return [true, 'BEDRIFT', Bedrift];
    } else if (
        type
            .toString()
            .toUpperCase()
            .includes('SAMHANDLING')
    ) {
        return [true, 'SAMHANDLING', Andre];
    }
    return false;
};
