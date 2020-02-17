import { MenuValue, oppdaterSessionStorage } from '../../../../../../../utils/meny-storage-utils';
import React from 'react';

interface LenkeData {
    url: string;
    lenkeTekstId: string;
    stikkordId: string;
    onClick?: Function;
}

export type OnArbeidsFlateClick = (settArbeidsflateFunc: () => void) => (event: React.MouseEvent<HTMLAnchorElement>) => void;

const pathPersonFlate = '/dekoratoren/person/';
const pathBedriftFlate = '/dekoratoren/bedrift/';
const samarbeidspartnerFlate = '/dekoratoren/samarbeidspartner/';

const onArbeidsflateClick =
    (url: string, arbeidsflate: MenuValue): OnArbeidsFlateClick => (settArbeidsflate: () => void) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    oppdaterSessionStorage(
        event,
        arbeidsflate,
        url
    );
    settArbeidsflate();
};

const privatpersonLenker: LenkeData[] = [
    {
        url: 'https://www.nav.no/person/dittnav',
        lenkeTekstId: 'person-minside-lenke',
        stikkordId: 'meny-bunnlenke-minside-stikkord',
    },
    {
        url: pathBedriftFlate,
        lenkeTekstId: 'rolle-bedrift',
        stikkordId: 'meny-bunnlenke-arbeidsgiver-stikkord',
        onClick: onArbeidsflateClick(pathBedriftFlate, MenuValue.ARBEIDSGIVER)
    },
    {
        url: samarbeidspartnerFlate,
        lenkeTekstId: 'rolle-samarbeidspartner',
        stikkordId: 'meny-bunnlenke-samarbeidspartner-stikkord',
        onClick: onArbeidsflateClick(samarbeidspartnerFlate, MenuValue.SAMARBEIDSPARTNER)
    },
];

const arbeidsgiverLenker: LenkeData[] = [
    {
        url: pathPersonFlate,
        lenkeTekstId: 'rolle-person',
        stikkordId: 'meny-bunnlenke-minside-stikkord',
        onClick: onArbeidsflateClick(pathPersonFlate, MenuValue.PRIVATPERSON)
    },
    {
        url: 'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/',
        lenkeTekstId: 'arbeidsgiver-minside-lenke',
        stikkordId: 'meny-bunnlenke-arbeidsgiver-stikkord',
    },
    {
        url: samarbeidspartnerFlate,
        lenkeTekstId: 'rolle-samarbeidspartner',
        stikkordId: 'meny-bunnlenke-samarbeidspartner-stikkord',
        onClick: onArbeidsflateClick(samarbeidspartnerFlate, MenuValue.SAMARBEIDSPARTNER)
    },
];

const samarbeidspartnerLenker: LenkeData[] = [
    {
        url: pathPersonFlate,
        lenkeTekstId: 'rolle-person',
        stikkordId: 'meny-bunnlenke-minside-stikkord',
        onClick: onArbeidsflateClick(pathPersonFlate, MenuValue.PRIVATPERSON)
    },
    {
        url: pathBedriftFlate,
        lenkeTekstId: 'rolle-bedrift',
        stikkordId: 'meny-bunnlenke-arbeidsgiver-stikkord',
        onClick: onArbeidsflateClick(pathBedriftFlate, MenuValue.ARBEIDSGIVER)
    },
];

const ikkeValgtLenker: LenkeData[] = [];

export const bunnLenker = {
    [MenuValue.PRIVATPERSON]: privatpersonLenker,
    [MenuValue.ARBEIDSGIVER]: arbeidsgiverLenker,
    [MenuValue.SAMARBEIDSPARTNER]: samarbeidspartnerLenker,
    [MenuValue.IKKEVALGT]: ikkeValgtLenker
};
