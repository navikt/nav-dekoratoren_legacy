import React from 'react';
export const NAVHEADER = 'NAVHEADER';

interface Seksjon<T> {
    person: () => T;
    bedrift: () => T;
    samhandling: () => T;
}

export enum MenuValue {
    PRIVATPERSON = 'PRIVATPERSON',
    BEDRIFT = 'BEDRIFT',
    SAMHANDLING = 'SAMHANDLING',
}

export const checkUriPath = () => {
    const locationPath = window.location.pathname.split('/')[3];
    if (locationPath !== undefined) {
        sessionStorage.setItem(NAVHEADER, locationPath);
        return locationPath;
    }
    return null;
};

const checkString = (input: string, type: string): boolean => {
    return input
        .toString()
        .toUpperCase()
        .includes(type);
};

export function getContent<T>(
    type: string,
    { person, bedrift, samhandling }: Seksjon<T>
) {
    if (checkString(type, 'PERSON')) {
        return person();
    } else if (checkString(type, 'BEDRIFT')) {
        return bedrift();
    } else if (checkString(type, 'SAMHANDLING')) {
        return samhandling();
    }
    return person();
}

export function hentStatus() {
    const path = checkUriPath();
    if (path) {
        return getMenuValue(path);
    }
    const storage = sessionStorage.getItem(NAVHEADER);
    return storage ? getMenuValue(storage) : MenuValue.PRIVATPERSON;
}

export function setMenuView(
    meny: Array<object>
): {
    children: {}[];
    displayName: string;
    hasChildren: boolean;
    path: string;
} {
    const path = checkUriPath();
    if (path) {
        return getMenuView(path, meny);
    }
    const storage = sessionStorage.getItem(NAVHEADER);
    return storage ? getMenuView(storage, meny) : meny[0];
}

function getMenuView(arg: string, content: Array<object>): any {
    return getContent(arg, {
        person: () => {
            return content[0];
        },
        bedrift: () => {
            return content[1];
        },
        samhandling: () => {
            return content[2];
        },
    });
}

function getMenuValue(arg: string): MenuValue {
    return getContent(arg, {
        person: () => {
            return MenuValue.PRIVATPERSON;
        },
        bedrift: () => {
            return MenuValue.BEDRIFT;
        },
        samhandling: () => {
            return MenuValue.SAMHANDLING;
        },
    });
}
