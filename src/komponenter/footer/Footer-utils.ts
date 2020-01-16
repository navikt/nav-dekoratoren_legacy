import { FooterSeksjon, lang } from './FooterLenker';
import { Language } from '../../reducer/language-duck';

export interface FooterLenke {
    lenketekst: string;
    url: string;
    seksjon: FooterSeksjon;
}

export interface LanguageSelectors {
    lenketekst: string;
    url: string;
    testurl: string;
    lang: Language;
}

export const getLanguage = (language: Language) => {
    const nonSelectedLang = lang;
    switch (language) {
        case Language.NORSK:
            return nonSelectedLang.splice(1, 3);
        case Language.ENGELSK:
            nonSelectedLang.splice(1, 1);
            return nonSelectedLang;
        case Language.SAMISK:
            return nonSelectedLang.splice(0, 2);
        default:
            return nonSelectedLang.splice(1, 3);
    }
};
