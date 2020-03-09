import { MenuValue } from '../../../utils/meny-storage-utils';

export interface ArbeidsflateLenke {
    tittel: MenuValue;
    url: string;
    beskrivelse: string;
    key: MenuValue;
}

export const arbeidsflateLenker: ArbeidsflateLenke[] = [
    {
        tittel: MenuValue.PRIVATPERSON,
        url: '/dekoratoren/person/',
        beskrivelse: 'Utbetalingsoversikt, saksoversikt, sykefravær',
        key: MenuValue.PRIVATPERSON,
    },
    {
        tittel: MenuValue.ARBEIDSGIVER,
        url: '/dekoratoren/bedrift/',
        beskrivelse:
            'Tjenester og skjemaer, rekruttering, oppfølging, inkluderende arbeidsliv, hjelpemidler',
        key: MenuValue.ARBEIDSGIVER,
    },
    {
        tittel: MenuValue.SAMARBEIDSPARTNER,
        url: '/dekoratoren/samarbeidspartner/',
        beskrivelse:
            'Kommuner, utdanningsområdet, psykisk helse, hjelpemidler, leger og behandlere',
        key: MenuValue.SAMARBEIDSPARTNER,
    },
];

export const getArbeidsflatelenker = (
    arbeidsflate: MenuValue
): ArbeidsflateLenke[] => {
    switch (arbeidsflate) {
        case MenuValue.PRIVATPERSON:
            return arbeidsflateLenker.filter(
                lenke =>
                    lenke.key === MenuValue.ARBEIDSGIVER ||
                    lenke.key === MenuValue.SAMARBEIDSPARTNER
            );
        case MenuValue.ARBEIDSGIVER:
            return arbeidsflateLenker.filter(
                lenke =>
                    lenke.key === MenuValue.PRIVATPERSON ||
                    lenke.key === MenuValue.SAMARBEIDSPARTNER
            );
        // tslint:disable-next-line:no-switch-case-fall-through
        case MenuValue.SAMARBEIDSPARTNER:
            return arbeidsflateLenker.filter(
                lenke =>
                    lenke.key === MenuValue.ARBEIDSGIVER ||
                    lenke.key === MenuValue.PRIVATPERSON
            );
        // tslint:disable-next-line:no-switch-case-fall-through
        default:
            return arbeidsflateLenker.filter(
                lenke =>
                    lenke.key === MenuValue.ARBEIDSGIVER ||
                    lenke.key === MenuValue.SAMARBEIDSPARTNER
            );
    }
};
