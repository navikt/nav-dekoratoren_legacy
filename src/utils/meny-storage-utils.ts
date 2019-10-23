import { MenySeksjon, Meny } from '../reducer/menu-duck';
import { Language, spraakValgNorsk } from '../reducer/language-duck';
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

export function setDropdownMenuView(
    menypunkter: Meny[],
    language: Language
): MenySeksjon {
    const languageSection = setLanguage(language, menypunkter);
    if (verifyWindowObj()) {
        const storage = getSessionStorage(NAVHEADER);
        return spraakValgNorsk(language)
            ? getDropdownMenuContent(storage, languageSection)
            : languageSection[0];
    }
    return languageSection[0];
}

export const setLanguage = (lang: Language, menu: Meny[]): MenySeksjon[] => {
    switch (lang) {
        case Language.NORSK:
            return menu[0].children;
        case Language.ENGELSK:
            return menu[1].children;
        case Language.SAMISK:
            return menu[2].children; //bytt til '2' når samisk er lagt til i meny
        default:
            return menu[0].children;
    }
};

function getDropdownMenuContent(
    storage: string | null,
    content: MenySeksjon[]
): MenySeksjon {
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
