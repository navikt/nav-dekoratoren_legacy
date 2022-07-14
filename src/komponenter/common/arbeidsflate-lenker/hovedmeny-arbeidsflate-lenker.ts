import { MenuValue } from 'utils/meny-storage-utils';
import { arbeidsgiverContextLenke, personContextLenke, samarbeidspartnerContextLenke } from './arbeidsflate-lenker';
import { Environment } from 'store/reducers/environment-duck';

export type ArbeidsflateLenkeData = {
    url: string;
    lenkeTekstId: string;
    stikkordId: string;
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

const privatpersonLenker = (env: Environment): ArbeidsflateLenkeData[] => [
    dittNavLenkeData(env.DITT_NAV_URL),
    arbeidsgiverContextLenke(env.XP_BASE_URL),
    samarbeidspartnerContextLenke(env.XP_BASE_URL),
];

const arbeidsgiverLenker = (env: Environment): ArbeidsflateLenkeData[] => [
    {
        url: env.MINSIDE_ARBEIDSGIVER_URL + valgtbedrift(),
        lenkeTekstId: 'arbeidsgiver-minside-lenke',
        stikkordId: 'meny-bunnlenke-arbeidsgiver-stikkord',
        key: MenuValue.ARBEIDSGIVER,
    },
    personContextLenke(env.XP_BASE_URL),
    samarbeidspartnerContextLenke(env.XP_BASE_URL),
];

const samarbeidspartnerLenker = (env: Environment): ArbeidsflateLenkeData[] => [
    personContextLenke(env.XP_BASE_URL),
    arbeidsgiverContextLenke(env.XP_BASE_URL),
];

const IKKEBESTEMTLenker = (): ArbeidsflateLenkeData[] => [];

export const bunnLenker = (env: Environment) => ({
    [MenuValue.PRIVATPERSON]: privatpersonLenker(env),
    [MenuValue.ARBEIDSGIVER]: arbeidsgiverLenker(env),
    [MenuValue.SAMARBEIDSPARTNER]: samarbeidspartnerLenker(env),
    [MenuValue.IKKEBESTEMT]: IKKEBESTEMTLenker(),
});
