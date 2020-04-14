import { MenuValue, oppdaterSessionStorage } from 'utils/meny-storage-utils';
import { erNavDekoratoren } from 'utils/Environment';
import { finnArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { Dispatch } from 'redux';

export interface ArbeidsflateLenke {
    url: string;
    lenkeTekstId: string;
    stikkordId: string;
    footerStikkordId: string;
    key: MenuValue;
}

export const arbeidsflateLenker = (
    XP_BASE_URL: string
): ArbeidsflateLenke[] => [
    personContextLenke(XP_BASE_URL),
    arbeidsgiverContextLenke(XP_BASE_URL),
    samarbeidspartnerContextLenke(XP_BASE_URL),
];

export const personContextLenke = (XP_BASE_URL: string) => {
    return {
        url: `${XP_BASE_URL}`,
        lenkeTekstId: 'rolle-privatperson',
        stikkordId: 'meny-bunnlenke-minside-stikkord',
        footerStikkordId: 'footer-stikkord-privatperson',
        key: MenuValue.PRIVATPERSON,
    };
};

export const arbeidsgiverContextLenke = (XP_BASE_URL: string) => {
    return {
        url: `${XP_BASE_URL}/no/bedrift`,
        lenkeTekstId: 'rolle-arbeidsgiver',
        stikkordId: 'meny-bunnlenke-arbeidsgiver-stikkord',
        footerStikkordId: 'footer-stikkord-arbeidsgiver',
        key: MenuValue.ARBEIDSGIVER,
    };
};

export const samarbeidspartnerContextLenke = (XP_BASE_URL: string) => {
    return {
        url: `${XP_BASE_URL}/no/samarbeidspartner`,
        lenkeTekstId: 'rolle-samarbeidspartner',
        stikkordId: 'meny-bunnlenke-samarbeidspartner-stikkord',
        footerStikkordId: 'footer-stikkord-samarbeidspartner',
        key: MenuValue.SAMARBEIDSPARTNER,
    };
};

export const getArbeidsflateContext = (
    XP_BASE_URL: string,
    arbeidsflate: MenuValue
) =>
    arbeidsflate === MenuValue.ARBEIDSGIVER
        ? arbeidsgiverContextLenke(XP_BASE_URL)
        : arbeidsflate === MenuValue.SAMARBEIDSPARTNER
        ? samarbeidspartnerContextLenke(XP_BASE_URL)
        : personContextLenke(XP_BASE_URL);

export const settArbeidsflate = (
    dispatch: Dispatch,
    lenke: ArbeidsflateLenke
) => {
    oppdaterSessionStorage(lenke.key);
    if (erNavDekoratoren()) {
        dispatch(finnArbeidsflate());
    } else {
        window.location.href = lenke.url;
    }
};
