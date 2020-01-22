export enum FooterSeksjon {
    VENSTRE,
    HOYRE,
    BUNN,
}

export interface FooterLenke {
    lenketekst: string;
    url: string;
    seksjon: FooterSeksjon;
}

const footerlenker: FooterLenke[] = [
    {
        lenketekst: 'Kontakt oss',
        url: 'https://www.nav.no/person/kontakt-oss/',
        seksjon: FooterSeksjon.VENSTRE,
    },
    {
        lenketekst: 'Klage og tilbakemeldinger',
        url: 'https://www.nav.no/person/kontakt-oss/tilbakemeldinger',
        seksjon: FooterSeksjon.VENSTRE,
    },
    {
        lenketekst: 'Lover og regler',
        url: 'https://lovdata.no/nav/',
        seksjon: FooterSeksjon.VENSTRE,
    },
    {
        lenketekst: 'Om NAV',
        url: '/no/nav-og-samfunn/om-nav/fakta-om-nav',
        seksjon: FooterSeksjon.BUNN,
    },
    {
        lenketekst: 'Forskning og statistikk',
        url:
            '/no/nav-og-samfunn/statistikk/arbeidssokere-og-stillinger-statistikk/relatert-informasjon/statistikk-og-analyse',
        seksjon: FooterSeksjon.BUNN,
    },
    {
        lenketekst: 'Nyheter og presse',
        url: '/no/nav-og-samfunn/kontakt-nav/presse',
        seksjon: FooterSeksjon.BUNN,
    },
    {
        lenketekst: 'Les mer om databeskyttelse og informasjonskapsler',
        url:
            '/no/nav-og-samfunn/om-nav/personvern-i-arbeids-og-velferdsetaten/personvern-og-sikkerhet-pa-nav.no',
        seksjon: FooterSeksjon.HOYRE,
    },
];

export const lenkerVenstre = footerlenker.filter(
    lenke => lenke.seksjon === FooterSeksjon.VENSTRE
);

export const lenkerHoyre = footerlenker.filter(
    lenke => lenke.seksjon === FooterSeksjon.HOYRE
);

export const lenkerBunn = footerlenker.filter(
    lenke => lenke.seksjon === FooterSeksjon.BUNN
);
