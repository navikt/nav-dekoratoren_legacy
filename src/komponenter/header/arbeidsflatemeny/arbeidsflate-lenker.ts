import { MenuValue } from '../../../utils/meny-storage-utils';
import Environment from '../../../utils/Environment';

export interface ArbeidsflateLenke {
    tittelId: string;
    url: string;
    key: MenuValue;
}

export const arbeidsflateLenker = (): ArbeidsflateLenke[] => [
    {
        tittelId: 'rolle-privatperson',
        url: `${Environment.XP_BASE_URL}`,
        key: MenuValue.PRIVATPERSON,
    },
    {
        tittelId: 'rolle-arbeidsgiver',
        url: `${Environment.XP_BASE_URL}/no/bedrift`,
        key: MenuValue.ARBEIDSGIVER,
    },
    {
        tittelId: 'rolle-samarbeidspartner',
        url: `${Environment.XP_BASE_URL}/no/nav-og-samfunn`,
        key: MenuValue.SAMARBEIDSPARTNER,
    },
];
