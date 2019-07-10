import React from 'react';
import Environments from '../../../utils/Environments';

const { baseUrl } = Environments();

const samhandlingUrl = `${baseUrl}/person/nav-dekoratoren/samhandling`;

// TODO opprette restservice fra endepunktet til enonic og bytt ut data
export const Samhandling: {
    tittel: string;
    lenker: { tittel: string; url: string }[];
}[] = [
    {
        tittel: 'Statistikk',
        lenker: [
            {
                tittel: 'Arbeidssøkere og stillinger',
                url: samhandlingUrl,
            },
            {
                tittel: 'Sykefravær og statistikk',
                url: samhandlingUrl,
            },
            {
                tittel: 'Se flere',
                url: samhandlingUrl,
            },
        ],
    },
    {
        tittel: 'Kunnskap',
        lenker: [
            {
                tittel: 'Analyser fra NAV',
                url: samhandlingUrl,
            },
            {
                tittel: 'Forskningsrapporter',
                url: samhandlingUrl,
            },
            {
                tittel: 'Se flere',
                url: samhandlingUrl,
            },
        ],
    },
    {
        tittel: 'Samarbeid',
        lenker: [
            {
                tittel: 'Leger og andre behandlere',
                url: samhandlingUrl,
            },
            {
                tittel: 'Tilskudd gjennom NAV',
                url: samhandlingUrl,
            },
            {
                tittel: 'Se flere',
                url: samhandlingUrl,
            },
        ],
    },
    {
        tittel: 'OM NAV',
        lenker: [
            {
                tittel: 'Lover og regler',
                url: samhandlingUrl,
            },
            {
                tittel: 'Personvern i arbeids- og velferdsetaten',
                url: samhandlingUrl,
            },
            {
                tittel: 'Se flere',
                url: samhandlingUrl,
            },
        ],
    },
    {
        tittel: 'Kontakt NAV',
        lenker: [
            {
                tittel: 'Kontakt oss',
                url: samhandlingUrl,
            },
            {
                tittel: 'Utbetalinger',
                url: samhandlingUrl,
            },
            {
                tittel: 'Se flere',
                url: samhandlingUrl,
            },
        ],
    },
];
