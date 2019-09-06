import { Data } from '../reducer/menu-duck';

export const NAVHEADER = 'NAVHEADER';

export enum MenuValue {
    PRIVATPERSON = 'PRIVATPERSON',
    BEDRIFT = 'BEDRIFT',
    SAMHANDLER = 'SAMHANDLER',
}

export const getSessionStorage = (key: string): string | null => {
    return sessionStorage.getItem(key);
};

export const setSessionStorage = (key: string, value: MenuValue) => {
    return sessionStorage.setItem(key, value);
};

export const checkUriPath = (): MenuValue => {
    const locationPath = window.location.pathname.split('/')[3];

    if (locationPath) {
        const menyvalg = locationPath === 'bedrift'
        ? MenuValue.BEDRIFT
        : locationPath === 'samhandler'
        ? MenuValue.SAMHANDLER
        : MenuValue.PRIVATPERSON;

        setSessionStorage(NAVHEADER, menyvalg);
        return menyvalg;
    }
    setSessionStorage(NAVHEADER, MenuValue.PRIVATPERSON);
    return MenuValue.PRIVATPERSON;
};

export function setDropdownMenuView(menypunkter: Data[]): Data {
    const storage = getSessionStorage(NAVHEADER);
    return storage ? getDropdownMenuContent(storage, menypunkter) : menypunkter[0];
}

function getDropdownMenuContent(storage: string, content: Data[]): Data {
    switch (storage) {
        case MenuValue.PRIVATPERSON: return content[0];
        case MenuValue.BEDRIFT: return content[1];
        case MenuValue.SAMHANDLER: return content[2];
        default: return content[0];
    }
}