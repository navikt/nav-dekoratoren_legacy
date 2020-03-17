import { MenuValue } from '../../../../../../../utils/meny-storage-utils';
import Environment from '../../../../../../../utils/Environment';
import {
    arbeidsgiverContextLenke,
    personContextLenke,
    samarbeidspartnerContextLenke,
} from '../../../../../arbeidsflatemeny/arbeidsflate-lenker';

type LenkeData = {
    url: string;
    lenkeTekstId: string;
    stikkordId: string;
    key?: MenuValue;
};

const privatpersonLenker = (): LenkeData[] => [
    {
        url: Environment.DITT_NAV_URL,
        lenkeTekstId: 'person-minside-lenke',
        stikkordId: 'meny-bunnlenke-minside-stikkord',
    },
    arbeidsgiverContextLenke(),
    samarbeidspartnerContextLenke(),
];

const arbeidsgiverLenker = (): LenkeData[] => [
    {
        url: Environment.MINSIDE_ARBEIDSGIVER_URL,
        lenkeTekstId: 'arbeidsgiver-minside-lenke',
        stikkordId: 'meny-bunnlenke-arbeidsgiver-stikkord',
    },
    personContextLenke(),
    samarbeidspartnerContextLenke(),
];

const samarbeidspartnerLenker = (): LenkeData[] => [
    personContextLenke(),
    arbeidsgiverContextLenke(),
];

const ikkeValgtLenker = (): LenkeData[] => [];

export const bunnLenker = {
    [MenuValue.PRIVATPERSON]: privatpersonLenker,
    [MenuValue.ARBEIDSGIVER]: arbeidsgiverLenker,
    [MenuValue.SAMARBEIDSPARTNER]: samarbeidspartnerLenker,
    [MenuValue.IKKEVALGT]: ikkeValgtLenker,
};
