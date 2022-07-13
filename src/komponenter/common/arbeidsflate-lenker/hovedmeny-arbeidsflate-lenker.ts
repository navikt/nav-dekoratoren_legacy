import { MenuValue } from 'utils/meny-storage-utils';
import { arbeidsgiverContextLenke, personContextLenke, samarbeidspartnerContextLenke } from './arbeidsflate-lenker';
import { Environment } from 'store/reducers/environment-duck';

type LenkeData = {
    url: string;
    lenkeTekstId: string;
    stikkordId: string;
    key: MenuValue;
};

export const valgtbedrift = () => {
    const orgnummerFraUrl = new URLSearchParams(window.location.search).get('bedrift');
    return orgnummerFraUrl ? `?bedrift=${orgnummerFraUrl}` : '';
};

const privatpersonLenker = (env: Environment): LenkeData[] => [
    {
        url: env.DITT_NAV_URL,
        lenkeTekstId: 'min-side',
        stikkordId: 'meny-bunnlenke-minside-stikkord',
        key: MenuValue.PRIVATPERSON,
    },
    arbeidsgiverContextLenke(env.XP_BASE_URL),
    samarbeidspartnerContextLenke(env.XP_BASE_URL),
];

const arbeidsgiverLenker = (env: Environment): LenkeData[] => [
    {
        url: env.MINSIDE_ARBEIDSGIVER_URL + valgtbedrift(),
        lenkeTekstId: 'arbeidsgiver-minside-lenke',
        stikkordId: 'meny-bunnlenke-arbeidsgiver-stikkord',
        key: MenuValue.ARBEIDSGIVER,
    },
    personContextLenke(env.XP_BASE_URL),
    samarbeidspartnerContextLenke(env.XP_BASE_URL),
];

const samarbeidspartnerLenker = (env: Environment): LenkeData[] => [
    personContextLenke(env.XP_BASE_URL),
    arbeidsgiverContextLenke(env.XP_BASE_URL),
];

const IKKEBESTEMTLenker = (): LenkeData[] => [];

export const bunnLenker = (env: Environment) => ({
    [MenuValue.PRIVATPERSON]: privatpersonLenker(env),
    [MenuValue.ARBEIDSGIVER]: arbeidsgiverLenker(env),
    [MenuValue.SAMARBEIDSPARTNER]: samarbeidspartnerLenker(env),
    [MenuValue.IKKEBESTEMT]: IKKEBESTEMTLenker(),
});
