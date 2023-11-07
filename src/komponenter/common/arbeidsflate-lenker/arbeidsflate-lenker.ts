import { Locale, languageDuck } from 'store/reducers/language-duck';
import { LangKey } from 'tekster/ledetekster';
import { MenuValue } from 'utils/meny-storage-utils';

export interface ArbeidsflateLenke {
    url: string;
    lenkeTekstId: LangKey;
    stikkordId: LangKey;
    key: MenuValue;
}

const erNorsk = (language: Locale) => {
    return language === Locale.BOKMAL || language === Locale.NYNORSK || language === Locale.SAMISK;
};

export const arbeidsflateLenker = (XP_BASE_URL: string, language: Locale): ArbeidsflateLenke[] => [
    personContextLenke(XP_BASE_URL, language),
    arbeidsgiverContextLenke(XP_BASE_URL, language),
    samarbeidspartnerContextLenke(XP_BASE_URL, language),
];

export const personContextLenke = (XP_BASE_URL: string, language: Locale): ArbeidsflateLenke => {
    const url = erNorsk(language) ? `${XP_BASE_URL}` : `${XP_BASE_URL}/en/`;
    return {
        url,
        lenkeTekstId: 'rolle-privatperson',
        stikkordId: 'meny-bunnlenke-minside-stikkord',
        key: MenuValue.PRIVATPERSON,
    };
};

export const arbeidsgiverContextLenke = (XP_BASE_URL: string, language: Locale): ArbeidsflateLenke => {
    const url = erNorsk(language) ? `${XP_BASE_URL}/no/bedrift` : `${XP_BASE_URL}/en/`;
    return {
        url,
        lenkeTekstId: 'rolle-arbeidsgiver',
        stikkordId: 'meny-bunnlenke-arbeidsgiver-stikkord',
        key: MenuValue.ARBEIDSGIVER,
    };
};

export const samarbeidspartnerContextLenke = (XP_BASE_URL: string, language: Locale): ArbeidsflateLenke => {
    const url = erNorsk(language) ? `${XP_BASE_URL}/no/samarbeidspartner` : `${XP_BASE_URL}/en/`;
    return {
        url,
        lenkeTekstId: 'rolle-samarbeidspartner',
        stikkordId: 'meny-bunnlenke-samarbeidspartner-stikkord',
        key: MenuValue.SAMARBEIDSPARTNER,
    };
};

export const getArbeidsflateContext = (XP_BASE_URL: string, arbeidsflate: MenuValue, language: Locale) => {
    return arbeidsflate === MenuValue.ARBEIDSGIVER
        ? arbeidsgiverContextLenke(XP_BASE_URL, language)
        : arbeidsflate === MenuValue.SAMARBEIDSPARTNER
        ? samarbeidspartnerContextLenke(XP_BASE_URL, language)
        : personContextLenke(XP_BASE_URL, language);
};
