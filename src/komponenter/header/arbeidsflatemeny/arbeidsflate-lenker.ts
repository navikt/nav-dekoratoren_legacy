import { MenuValue } from '../../../utils/meny-storage-utils';
import Environment from '../../../utils/Environment';

export interface ArbeidsflateLenke {
    tittelId: string;
    url: string;
    beskrivelse: string;
    key: MenuValue;
}

export const arbeidsflateLenker = (): ArbeidsflateLenke[] => [
    {
        tittelId: 'rolle-privatperson',
        url: `${Environment.XP_BASE_URL}`,
        beskrivelse: 'Utbetalingsoversikt, saksoversikt, sykefravær',

        key: MenuValue.PRIVATPERSON,
    },
    {
        tittelId: 'rolle-arbeidsgiver',
        url: `${Environment.XP_BASE_URL}/no/bedrift`,
        beskrivelse:
            'Tjenester og skjemaer, rekruttering, oppfølging, inkluderende arbeidsliv, hjelpemidler',
        key: MenuValue.ARBEIDSGIVER,
    },
    {
        tittelId: 'rolle-samarbeidspartner',
        url: `${Environment.XP_BASE_URL}/no/nav-og-samfunn`,
        beskrivelse:
            'Kommuner, utdanningsområdet, psykisk helse, hjelpemidler, leger og behandlere',
        key: MenuValue.SAMARBEIDSPARTNER,
    },
];
