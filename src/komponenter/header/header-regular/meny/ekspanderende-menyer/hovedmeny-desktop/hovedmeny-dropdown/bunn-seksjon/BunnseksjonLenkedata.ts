import { MenuValue } from 'utils/meny-storage-utils';
import { arbeidsgiverContextLenke } from 'komponenter/header/header-regular/arbeidsflatemeny/arbeidsflate-lenker';
import { personContextLenke } from 'komponenter/header/header-regular/arbeidsflatemeny/arbeidsflate-lenker';
import { samarbeidspartnerContextLenke } from 'komponenter/header/header-regular/arbeidsflatemeny/arbeidsflate-lenker';
import { EnvironmentState } from 'reducer/environment-duck';

type LenkeData = {
    url: string;
    lenkeTekstId: string;
    stikkordId: string;
    key?: MenuValue;
};

const privatpersonLenker = (env: EnvironmentState): LenkeData[] => [
    {
        url: env.DITT_NAV_URL,
        lenkeTekstId: 'person-minside-lenke',
        stikkordId: 'meny-bunnlenke-minside-stikkord',
    },
    arbeidsgiverContextLenke(env.XP_BASE_URL),
    samarbeidspartnerContextLenke(env.XP_BASE_URL),
];

const arbeidsgiverLenker = (env: EnvironmentState): LenkeData[] => [
    {
        url: env.MINSIDE_ARBEIDSGIVER_URL,
        lenkeTekstId: 'arbeidsgiver-minside-lenke',
        stikkordId: 'meny-bunnlenke-arbeidsgiver-stikkord',
    },
    personContextLenke(env.XP_BASE_URL),
    samarbeidspartnerContextLenke(env.XP_BASE_URL),
];

const samarbeidspartnerLenker = (env: EnvironmentState): LenkeData[] => [
    personContextLenke(env.XP_BASE_URL),
    arbeidsgiverContextLenke(env.XP_BASE_URL),
];

const ikkeValgtLenker = (): LenkeData[] => [];

export const bunnLenker = (env: EnvironmentState) => ({
    [MenuValue.PRIVATPERSON]: privatpersonLenker(env),
    [MenuValue.ARBEIDSGIVER]: arbeidsgiverLenker(env),
    [MenuValue.SAMARBEIDSPARTNER]: samarbeidspartnerLenker(env),
    [MenuValue.IKKEVALGT]: ikkeValgtLenker(),
});
