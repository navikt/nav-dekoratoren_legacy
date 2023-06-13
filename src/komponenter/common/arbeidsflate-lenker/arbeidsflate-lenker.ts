import { LangKey } from 'tekster/ledetekster';
import { MenuValue } from 'utils/meny-storage-utils';

export interface ArbeidsflateLenke {
    url: string;
    lenkeTekstId: LangKey;
    stikkordId: LangKey;
    key: MenuValue;
}

export const arbeidsflateLenker = (XP_BASE_URL: string): ArbeidsflateLenke[] => [
    personContextLenke(XP_BASE_URL),
    arbeidsgiverContextLenke(XP_BASE_URL),
    samarbeidspartnerContextLenke(XP_BASE_URL),
];

export const personContextLenke = (XP_BASE_URL: string) => {
    return {
        url: `${XP_BASE_URL}`,
        lenkeTekstId: 'rolle-privatperson' as const,
        stikkordId: 'meny-bunnlenke-minside-stikkord' as const,
        key: MenuValue.PRIVATPERSON,
    };
};

export const arbeidsgiverContextLenke = (XP_BASE_URL: string) => {
    return {
        url: `${XP_BASE_URL}/no/bedrift`,
        lenkeTekstId: 'rolle-arbeidsgiver' as const,
        stikkordId: 'meny-bunnlenke-arbeidsgiver-stikkord' as const,
        key: MenuValue.ARBEIDSGIVER,
    };
};

export const samarbeidspartnerContextLenke = (XP_BASE_URL: string) => {
    return {
        url: `${XP_BASE_URL}/no/samarbeidspartner`,
        lenkeTekstId: 'rolle-samarbeidspartner' as const,
        stikkordId: 'meny-bunnlenke-samarbeidspartner-stikkord' as const,
        key: MenuValue.SAMARBEIDSPARTNER,
    };
};

export const getArbeidsflateContext = (XP_BASE_URL: string, arbeidsflate: MenuValue) =>
    arbeidsflate === MenuValue.ARBEIDSGIVER
        ? arbeidsgiverContextLenke(XP_BASE_URL)
        : arbeidsflate === MenuValue.SAMARBEIDSPARTNER
        ? samarbeidspartnerContextLenke(XP_BASE_URL)
        : personContextLenke(XP_BASE_URL);
