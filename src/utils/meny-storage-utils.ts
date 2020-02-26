import React from 'react';
import { MenySeksjon, Meny } from '../reducer/menu-duck';
import { Language, spraakValgetErNorsk } from '../reducer/language-duck';
import { verifyWindowObj } from './Environment';

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

export const oppdaterSessionStorage = (valgVerdi: MenuValue): void => {
    const headervalg = getSessionStorage(NAVHEADER);
    if (headervalg && headervalg === valgVerdi) {
        return;
    }
    setSessionStorage(NAVHEADER, valgVerdi);
};

export function selectMenu(
    menypunkter: Meny[],
    language: Language,
    arbeidsflate: MenuValue
): MenySeksjon {
    const languageSection = getChildren(language, menypunkter);
    if (verifyWindowObj()) {
        return spraakValgetErNorsk(language)
            ? getDropdownMenuContent(arbeidsflate, languageSection)
            : languageSection[0];
    }
    return languageSection[0];
}

export const getChildren = (lang: Language, menu: Meny[]): MenySeksjon[] => {
    switch (lang) {
        case Language.NORSK: {
            const elem = menu.find(elem => elem.path === '/no');
            return (elem && elem.children) || [];
        }
        case Language.ENGELSK: {
            const elem = menu.find(elem => elem.path === '/en');
            return (elem && elem.children) || [];
        }
        case Language.SAMISK: {
            const elem = menu.find(elem => elem.path === '/se');
            return (elem && elem.children) || [];
        }
        default:
            return [];
    }
};

function getDropdownMenuContent(
    storage: MenuValue,
    content: MenySeksjon[]
): MenySeksjon {
    switch (storage) {
        // Todo: Fix tree-search
        case MenuValue.PRIVATPERSON:
            return content[0].children[0].children[0];
        case MenuValue.ARBEIDSGIVER:
            return content[0].children[1].children[0];
        case MenuValue.SAMARBEIDSPARTNER:
            return content[0].children[3].children[0];
        default:
            return content[0].children[0].children[0];
    }
}
