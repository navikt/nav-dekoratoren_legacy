import { Locale } from 'store/reducers/language-duck';
import { MenuValue } from 'utils/meny-storage-utils';
import { arbeidsgiverContextLenke, personContextLenke, samarbeidspartnerContextLenke } from './arbeidsflate-lenker';
import { Environment } from 'store/reducers/environment-duck';
import { LangKey } from 'tekster/ledetekster';

export type ArbeidsflateLenkeData = {
    url: string;
    lenkeTekstId: LangKey;
    stikkordId: LangKey;
    key: MenuValue;
};

export const valgtbedrift = () => {
    const orgnummerFraUrl = new URLSearchParams(window.location.search).get('bedrift');
    return orgnummerFraUrl ? `?bedrift=${orgnummerFraUrl}` : '';
};

export const dittNavLenkeData = (url: string): ArbeidsflateLenkeData => ({
    url,
    lenkeTekstId: 'min-side',
    stikkordId: 'meny-bunnlenke-minside-stikkord',
    key: MenuValue.PRIVATPERSON,
});

const privatpersonLenker = (env: Environment, language: Locale): ArbeidsflateLenkeData[] => [
    dittNavLenkeData(env.MIN_SIDE_URL),
    arbeidsgiverContextLenke(env.XP_BASE_URL, language),
    samarbeidspartnerContextLenke(env.XP_BASE_URL, language),
];

const arbeidsgiverLenker = (env: Environment, language: Locale): ArbeidsflateLenkeData[] => [
    {
        url: env.MINSIDE_ARBEIDSGIVER_URL + valgtbedrift(),
        lenkeTekstId: 'arbeidsgiver-minside-lenke',
        stikkordId: 'meny-bunnlenke-arbeidsgiver-stikkord',
        key: MenuValue.ARBEIDSGIVER,
    },
    personContextLenke(env.XP_BASE_URL, language),
    samarbeidspartnerContextLenke(env.XP_BASE_URL, language),
];

const samarbeidspartnerLenker = (env: Environment, language: Locale): ArbeidsflateLenkeData[] => [
    personContextLenke(env.XP_BASE_URL, language),
    arbeidsgiverContextLenke(env.XP_BASE_URL, language),
];

const IKKEBESTEMTLenker = (): ArbeidsflateLenkeData[] => [];

export const bunnLenker = (env: Environment, language: Locale) => ({
    [MenuValue.PRIVATPERSON]: privatpersonLenker(env, language),
    [MenuValue.ARBEIDSGIVER]: arbeidsgiverLenker(env, language),
    [MenuValue.SAMARBEIDSPARTNER]: samarbeidspartnerLenker(env, language),
    [MenuValue.IKKEBESTEMT]: IKKEBESTEMTLenker(),
});
