import React from 'react';
const personUrl = 'http://localhost:3000/person/';

// TODO opprette restservice fra endepunktet til enonic og bytt ut data
export const Person: {
    tittel: string;
    lenker: { tittel: string; url: string }[];
}[] = [
    {
        tittel: 'Arbeidssøker',
        lenker: [
            {
                tittel: 'Mistet jobben',
                url: personUrl,
            },
            {
                tittel: 'skiftet yrke',
                url: personUrl,
            },
            {
                tittel: 'Se flere',
                url: personUrl,
            },
        ],
    },
    {
        tittel: 'Syk',
        lenker: [
            {
                tittel: 'Sykemeldt',
                url: personUrl,
            },
            {
                tittel: 'Vil prøve å jobbe litt',
                url: personUrl,
            },
            {
                tittel: 'Se flere',
                url: personUrl,
            },
        ],
    },
    {
        tittel: 'Pensjon',
        lenker: [
            {
                tittel: 'Hva vil jeg få i pensjon',
                url: personUrl,
            },
            {
                tittel: 'Søke alderpensjon',
                url: personUrl,
            },
            {
                tittel: 'Se flere',
                url: personUrl,
            },
        ],
    },
    {
        tittel: 'Familie og barn',
        lenker: [
            {
                tittel: 'Venter barn eller nylig fått barn',
                url: personUrl,
            },
            {
                tittel: 'Bli gift eller samboer',
                url: personUrl,
            },
            {
                tittel: 'Se flere',
                url: personUrl,
            },
        ],
    },
    {
        tittel: 'Sosiale tjenester',
        lenker: [
            {
                tittel: 'Penger til mat, husleie og slikt',
                url: personUrl,
            },
            {
                tittel: 'Sted å bo det neste døgnet',
                url: personUrl,
            },
            {
                tittel: 'Se flere',
                url: personUrl,
            },
        ],
    },
    {
        tittel: 'Nedsatt funksjonsevne',
        lenker: [
            {
                tittel: 'Tolketjenesten for tegnspråket',
                url: personUrl,
            },
            {
                tittel: 'Lese- og skrivevansker',
                url: personUrl,
            },
            {
                tittel: 'Se flere',
                url: personUrl,
            },
        ],
    },
    {
        tittel: 'Internasjonalt',
        lenker: [
            {
                tittel: 'Arbeid',
                url: personUrl,
            },
            {
                tittel: 'Helse',
                url: personUrl,
            },
            {
                tittel: 'Se flere',
                url: personUrl,
            },
        ],
    },
];
