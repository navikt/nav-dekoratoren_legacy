import React from 'react';
import Environments from '../../../utils/Environments';
const { baseUrl } = Environments();

const bedriftUrl = `${baseUrl}/person/nav-dekoratoren/bedrift`;

// TODO opprette restservice fra endepunktet til enonic og bytt ut data
export const Bedrift: {
    tittel: string;
    lenker: { tittel: string; url: string }[];
}[] = [
    {
        tittel: 'Tjenester',
        lenker: [
            {
                tittel: 'NAV- og Altinn-tjenester',
                url: bedriftUrl,
            },
            {
                tittel: 'Foreldre, svangerskapspenger',
                url: bedriftUrl,
            },
            {
                tittel: 'Se flere',
                url: bedriftUrl,
            },
        ],
    },
    {
        tittel: 'skjemaer',
        lenker: [
            {
                tittel: 'Skjemaer for arbeidsgivere',
                url: bedriftUrl,
            },
            {
                tittel: 'Selvstendig næringsdrivende',
                url: bedriftUrl,
            },
            {
                tittel: 'Se flere',
                url: bedriftUrl,
            },
        ],
    },
    {
        tittel: 'Rekruttering',
        lenker: [
            {
                tittel: 'Kontakt oss',
                url: bedriftUrl,
            },
            {
                tittel: 'Annonser, stilling, finn kandidat i CV-basen',
                url: bedriftUrl,
            },
            {
                tittel: 'Se flere',
                url: bedriftUrl,
            },
        ],
    },
    {
        tittel: 'Oppfølging',
        lenker: [
            {
                tittel: 'Sykemeldt arbeidstaker',
                url: bedriftUrl,
            },
            {
                tittel: 'Tilrettelegge for ansatte med helseutfordringer',
                url: bedriftUrl,
            },
            {
                tittel: 'Se flere',
                url: bedriftUrl,
            },
        ],
    },
    {
        tittel: 'Inkluderende arbeidsliv',
        lenker: [
            {
                tittel: 'Veiviser for inkludering',
                url: bedriftUrl,
            },
            {
                tittel: 'Webinar',
                url: bedriftUrl,
            },
            {
                tittel: 'Se flere',
                url: bedriftUrl,
            },
        ],
    },
    {
        tittel: 'Hjelpemidler',
        lenker: [
            {
                tittel: 'Tilrettelegging i arbeid',
                url: bedriftUrl,
            },
            {
                tittel: 'Tolking på arbeidsplassen',
                url: bedriftUrl,
            },
            {
                tittel: 'Se flere',
                url: bedriftUrl,
            },
        ],
    },
];
