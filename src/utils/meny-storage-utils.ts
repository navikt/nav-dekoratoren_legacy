import { Data, MenyData } from '../reducer/menu-duck';
import { Language } from '../reducer/language-duck';

export const NAVHEADER = 'NAVHEADER';

export enum MenuValue {
    PRIVATPERSON = 'PRIVATPERSON',
    ARBEIDSGIVER = 'ARBEIDSGIVER',
    SAMARBEIDSPARTNER = 'SAMARBEIDSPARTNER',
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
        const menyvalg =
            locationPath === 'bedrift'
                ? MenuValue.ARBEIDSGIVER
                : locationPath === 'samarbeidspartner'
                ? MenuValue.SAMARBEIDSPARTNER
                : MenuValue.PRIVATPERSON;

        setSessionStorage(NAVHEADER, menyvalg);
        return menyvalg;
    }
    setSessionStorage(NAVHEADER, MenuValue.PRIVATPERSON);
    return MenuValue.PRIVATPERSON;
};

export function setDropdownMenuView(
    menypunkter: Data[],
    language: Language
): MenyData {
    if (language === Language.ENGELSK) {
        return menypunkter[1];
    }
    const storage = getSessionStorage(NAVHEADER);
    return storage
        ? getDropdownMenuContent(storage, menypunkter)
        : menypunkter[0].children[0];
}

function getDropdownMenuContent(storage: string, content: Data[]): MenyData {
    switch (storage) {
        case MenuValue.PRIVATPERSON:
            return content[0].children[0];
        case MenuValue.ARBEIDSGIVER:
            return content[0].children[1];
        case MenuValue.SAMARBEIDSPARTNER:
            return content[0].children[2];
        default:
            return content[0].children[0];
    }
}
