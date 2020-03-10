import {
    MenuValue,
    oppdaterSessionStorage,
} from '../../../utils/meny-storage-utils';
import Environment, { erNavDekoratoren } from '../../../utils/Environment';

export interface ArbeidsflateLenke {
    url: string;
    lenkeTekstId: string;
    stikkordId: string;
    key: MenuValue;
}

export const arbeidsflateLenker = (): ArbeidsflateLenke[] => [
    personContextLenke(),
    arbeidsgiverContextLenke(),
    samarbeidspartnerContextLenke(),
];

export const personContextLenke = () => ({
    url: `${Environment.XP_BASE_URL}`,
    lenkeTekstId: 'rolle-privatperson',
    stikkordId: 'meny-bunnlenke-minside-stikkord',
    key: MenuValue.PRIVATPERSON,
});

export const arbeidsgiverContextLenke = () => ({
    url: `${Environment.XP_BASE_URL}/no/bedrift`,
    lenkeTekstId: 'rolle-arbeidsgiver',
    stikkordId: 'meny-bunnlenke-arbeidsgiver-stikkord',
    key: MenuValue.ARBEIDSGIVER,
});

export const samarbeidspartnerContextLenke = () => ({
    url: `${Environment.XP_BASE_URL}/no/nav-og-samfunn`,
    lenkeTekstId: 'rolle-samarbeidspartner',
    stikkordId: 'meny-bunnlenke-samarbeidspartner-stikkord',
    key: MenuValue.SAMARBEIDSPARTNER,
});

export const getArbeidsflateContext = (arbeidsflate: MenuValue) =>
    arbeidsflate === MenuValue.ARBEIDSGIVER
        ? arbeidsgiverContextLenke()
        : arbeidsflate === MenuValue.SAMARBEIDSPARTNER
        ? samarbeidspartnerContextLenke()
        : personContextLenke();

export const settArbeidsflateOgRedirect = (
    lenke: ArbeidsflateLenke,
    settArbeidsflate: () => void
) => {
    oppdaterSessionStorage(lenke.key);
    if (erNavDekoratoren()) {
        settArbeidsflate();
    } else {
        window.location.href = lenke.url;
    }
};
