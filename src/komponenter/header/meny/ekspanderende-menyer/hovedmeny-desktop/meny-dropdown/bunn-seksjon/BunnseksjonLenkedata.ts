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
    onClick?: Function;
}

export type OnArbeidsFlateClick = (
    settArbeidsflateFunc: () => void,
) => (event: React.MouseEvent<HTMLAnchorElement>) => void;

const pathPersonFlate = '/dekoratoren/person/';
const pathBedriftFlate = '/dekoratoren/bedrift/';
const samarbeidspartnerFlate = '/dekoratoren/samarbeidspartner/';

const onArbeidsflateClick = (
    url: string,
    arbeidsflate: MenuValue,
): OnArbeidsFlateClick => (settArbeidsflate: () => void) => (
    event: React.MouseEvent<HTMLAnchorElement>,
) => {
    event.preventDefault();
    oppdaterSessionStorage(arbeidsflate);
    settArbeidsflate();
};

const personContextLenke = {
    url: pathPersonFlate,
    lenkeTekstId: 'rolle-privatperson',
    stikkordId: 'meny-bunnlenke-minside-stikkord',
    onClick: onArbeidsflateClick(pathPersonFlate, MenuValue.PRIVATPERSON),
};

const arbeidsgiverContextLenke = {
    url: pathBedriftFlate,
    lenkeTekstId: 'rolle-arbeidsgiver',
    stikkordId: 'meny-bunnlenke-arbeidsgiver-stikkord',
    onClick: onArbeidsflateClick(pathBedriftFlate, MenuValue.ARBEIDSGIVER),
};

const samarbeidspartnerContextLenke = {
    url: samarbeidspartnerFlate,
    lenkeTekstId: 'rolle-samarbeidspartner',
    stikkordId: 'meny-bunnlenke-samarbeidspartner-stikkord',
    onClick: onArbeidsflateClick(
        samarbeidspartnerFlate,
        MenuValue.SAMARBEIDSPARTNER,
    ),
};

const privatpersonLenker = (): LenkeData[] => [
    {
        url: Environment.DITT_NAV_URL,
        lenkeTekstId: 'person-minside-lenke',
        stikkordId: 'meny-bunnlenke-minside-stikkord',
    },
    arbeidsgiverContextLenke,
    samarbeidspartnerContextLenke
];

const arbeidsgiverLenker = (): LenkeData[] => [
    {
        url: Environment.MINSIDE_ARBEIDSGIVER_URL,
        lenkeTekstId: 'arbeidsgiver-minside-lenke',
        stikkordId: 'meny-bunnlenke-arbeidsgiver-stikkord',
    },
    personContextLenke,
    samarbeidspartnerContextLenke
];

const samarbeidspartnerLenker = (): LenkeData[] => [
    personContextLenke,
    arbeidsgiverContextLenke
];

const ikkeValgtLenker = (): LenkeData[] => [];

export const bunnLenker = {
    [MenuValue.PRIVATPERSON]: privatpersonLenker,
    [MenuValue.ARBEIDSGIVER]: arbeidsgiverLenker,
    [MenuValue.SAMARBEIDSPARTNER]: samarbeidspartnerLenker,
    [MenuValue.IKKEVALGT]: ikkeValgtLenker,
};
