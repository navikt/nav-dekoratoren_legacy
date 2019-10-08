import { Data } from '../reducer/menu-duck';
import { verifyWindowObj } from './environments';

export const NAVHEADER = 'NAVHEADER';

export enum MenuValue {
    PRIVATPERSON = 'PRIVATPERSON',
    ARBEIDSGIVER = 'ARBEIDSGIVER',
    SAMARBEIDSPARTNER = 'SAMARBEIDSPARTNER',
    IKKEVALGT = 'IKKEVALGT',
}

export const getSessionStorage = (key: string): string | null => {
    return sessionStorage.getItem(key);
};

export const setSessionStorage = (key: string, value: MenuValue) => {
    return sessionStorage.setItem(key, value);
};

const envokeWindowObj = () => {
    return window.location.pathname.split('/')[3];
};

export const checkUriPath = (): MenuValue => {
    const locationPath = verifyWindowObj()
        ? envokeWindowObj()
        : MenuValue.PRIVATPERSON;

    if (locationPath) {
        const menyvalg =
            locationPath === 'bedrift'
                ? MenuValue.ARBEIDSGIVER
                : locationPath === 'samarbeidspartner'
                ? MenuValue.SAMARBEIDSPARTNER
                : MenuValue.PRIVATPERSON;

        if (verifyWindowObj()) {
            setSessionStorage(NAVHEADER, menyvalg);
        }
        return menyvalg;
    }
    if (verifyWindowObj()) {
        setSessionStorage(NAVHEADER, MenuValue.PRIVATPERSON);
    }
    return MenuValue.PRIVATPERSON;
};

export function setDropdownMenuView(menypunkter: Data[]): Data {
    if (verifyWindowObj()) {
        const storage = getSessionStorage(NAVHEADER);
        return storage
            ? getDropdownMenuContent(storage, menypunkter)
            : menypunkter[0];
    }
    return menypunkter[0];
}

function getDropdownMenuContent(storage: string, content: Data[]): Data {
    switch (storage) {
        case MenuValue.PRIVATPERSON:
            return content[0];
        case MenuValue.ARBEIDSGIVER:
            return content[1];
        case MenuValue.SAMARBEIDSPARTNER:
            return content[2];
        default:
            return content[0];
    }
}
