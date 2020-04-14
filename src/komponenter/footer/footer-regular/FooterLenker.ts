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
        url: `/person/kontakt-oss/`,
        seksjon: FooterSeksjon.VENSTRE,
    },
    {
        lenketekst: 'NAV i ditt fylke',
        url: '/no/nav-og-samfunn/kontakt-nav/nav-i-ditt-fylke',
        seksjon: FooterSeksjon.VENSTRE,
    },
    {
        lenketekst: 'Klage og tilbakemeldinger',
        url: `/person/kontakt-oss/tilbakemeldinger`,
        seksjon: FooterSeksjon.VENSTRE,
    },
    {
        lenketekst: 'Lover og regler (ekstern lenke)',
        url: 'https://lovdata.no/nav/',
        seksjon: FooterSeksjon.VENSTRE,
    },
    {
        lenketekst: 'Om oss',
        url: '/no/nav-og-samfunn/om-nav/fakta-om-nav',
        seksjon: FooterSeksjon.HOYRE,
    },
    {
        lenketekst: 'Jobb i NAV',
        url: '/no/nav-og-samfunn/om-nav/sok-jobb-i-nav',
        seksjon: FooterSeksjon.HOYRE,
    },
    {
        lenketekst: 'Statistikk og analyse',
        url:
            '/no/nav-og-samfunn/statistikk/arbeidssokere-og-stillinger-statistikk/relatert-informasjon/statistikk-og-analyse',
        seksjon: FooterSeksjon.HOYRE,
    },
    {
        lenketekst: 'Nyheter og presse',
        url: '/no/nav-og-samfunn/kontakt-nav/presse',
        seksjon: FooterSeksjon.HOYRE,
    },
    {
        lenketekst: 'Personvern og informasjonskapsler på nav.no',
        url:
            '/no/nav-og-samfunn/om-nav/personvern-i-arbeids-og-velferdsetaten/personvern-og-sikkerhet-pa-nav.no',
        seksjon: FooterSeksjon.BUNN,
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
