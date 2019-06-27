import React from 'react';

const andreUrl = 'http://localhost:3000/andre/';

// TODO opprette restservice fra endepunktet til enonic og bytt ut data
export const Andre = [
    {
        tittel: 'Statistikk',
        lenker: [
            {
                tittel: 'Arbeidssøkere og stillinger',
                url: andreUrl,
            },
            {
                tittel: 'Sykefravær og statistikk',
                url: andreUrl,
            },
            {
                tittel: 'Se flere',
                url: andreUrl,
            },
        ],
    },
    {
        tittel: 'Kunnskap',
        lenker: [
            {
                tittel: 'Analyser fra NAV',
                url: andreUrl,
            },
            {
                tittel: 'Forskningsrapporter',
                url: andreUrl,
            },
            {
                tittel: 'Se flere',
                url: andreUrl,
            },
        ],
    },
    {
        tittel: 'Samarbeid',
        lenker: [
            {
                tittel: 'Leger og andre behandlere',
                url: andreUrl,
            },
            {
                tittel: 'Tilskudd gjennom NAV',
                url: andreUrl,
            },
            {
                tittel: 'Se flere',
                url: andreUrl,
            },
        ],
    },
    {
        tittel: 'OM NAV',
        lenker: [
            {
                tittel: 'Lover og regler',
                url: andreUrl,
            },
            {
                tittel: 'Personvern i arbeids- og velferdsetaten',
                url: andreUrl,
            },
            {
                tittel: 'Se flere',
                url: andreUrl,
            },
        ],
    },
    {
        tittel: 'Kontakt NAV',
        lenker: [
            {
                tittel: 'Kontakt oss',
                url: andreUrl,
            },
            {
                tittel: 'Utbetalinger',
                url: andreUrl,
            },
            {
                tittel: 'Se flere',
                url: andreUrl,
            },
        ],
    },
];
