import { Language } from '../../reducer/language-duck';
import { FooterLenke, LanguageSelectors } from './Footer-utils';

export const lang: LanguageSelectors[] = [
    {
        lenketekst: 'Norske sider',
        url: '/no/person',
        testurl: '/person/nav-dekoratoren/person/no/',
        lang: Language.NORSK,
    },
    {
        lenketekst: 'English pages',
        url: '/en/Home',
        testurl: '/person/nav-dekoratoren/person/en/',
        lang: Language.ENGELSK,
    },
    {
        lenketekst: 'Sámegiel skovit',
        url: '/se/Samegiella',
        testurl: '/person/nav-dekoratoren/person/se/',
        lang: Language.SAMISK,
    },
];

export enum FooterSeksjon {
    VENSTRE,
    HOYRE,
    BUNN,
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
