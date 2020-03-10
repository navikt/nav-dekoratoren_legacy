import {
    MenuValue,
    oppdaterSessionStorage,
} from '../../../../../../../utils/meny-storage-utils';
import React from 'react';
import Environment from '../../../../../../../utils/Environment';

type LenkeData = {
    url: string;
    lenkeTekstId: string;
    stikkordId: string;
    key?: MenuValue;
};

const personContextLenke = () => ({
    url: `${Environment.XP_BASE_URL}`,
    lenkeTekstId: 'rolle-privatperson',
    stikkordId: 'meny-bunnlenke-minside-stikkord',
    key: MenuValue.PRIVATPERSON,
});

const arbeidsgiverContextLenke = () => ({
    url: `${Environment.XP_BASE_URL}/no/bedrift`,
    lenkeTekstId: 'rolle-arbeidsgiver',
    stikkordId: 'meny-bunnlenke-arbeidsgiver-stikkord',
    key: MenuValue.ARBEIDSGIVER,
});

const samarbeidspartnerContextLenke = () => ({
    url: `${Environment.XP_BASE_URL}/no/nav-og-samfunn`,
    lenkeTekstId: 'rolle-samarbeidspartner',
    stikkordId: 'meny-bunnlenke-samarbeidspartner-stikkord',
    key: MenuValue.SAMARBEIDSPARTNER,
});

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
