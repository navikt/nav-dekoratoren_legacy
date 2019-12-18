import React from 'react';
import { MenySeksjon, Meny } from '../reducer/menu-duck';
import { Language, spraakValgetErNorsk } from '../reducer/language-duck';
import { verifyWindowObj } from '../Environment';

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

export const oppdaterSessionStorage = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    valgVerdi: MenuValue,
    url: string
): void => {
    e.preventDefault();
    const headervalg = getSessionStorage(NAVHEADER);
    if (headervalg && headervalg === valgVerdi) {
        return;
    }
    setSessionStorage(NAVHEADER, valgVerdi);
    // window.location.href = url;
};

export function selectMenu(
    menypunkter: Meny[],
    language: Language,
    arbeidsflate: MenuValue
): MenySeksjon {
    const languageSection = setLanguage(language, menypunkter);
    if (verifyWindowObj()) {
        return spraakValgetErNorsk(language)
            ? getDropdownMenuContent(arbeidsflate, languageSection)
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
            return menu[2].children;
        default:
            return menu[0].children;
    }
};

function getDropdownMenuContent(
    storage: MenuValue,
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
