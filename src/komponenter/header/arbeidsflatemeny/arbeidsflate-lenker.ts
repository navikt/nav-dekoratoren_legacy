import { MenuValue } from '../../../utils/meny-storage-utils';
import Environment from '../../../utils/Environment';

export interface ArbeidsflateLenke {
    tittelId: string;
    url: string;
    key: MenuValue;
    stikkord: string;
}

export const arbeidsflateLenker = (): ArbeidsflateLenke[] => [
    {
        tittelId: 'rolle-privatperson',
        url: `${Environment.XP_BASE_URL}`,
        key: MenuValue.PRIVATPERSON,
        stikkord: 'arbeidsflate-stikkord-om-privatperson',
    },
    {
        tittelId: 'rolle-arbeidsgiver',
        url: `${Environment.XP_BASE_URL}/no/bedrift`,
        key: MenuValue.ARBEIDSGIVER,
        stikkord: 'arbeidsflate-stikkord-om-arbeidsgiver',
    },
    {
        tittelId: 'rolle-samarbeidspartner',
        url: `${Environment.XP_BASE_URL}/no/nav-og-samfunn`,
        key: MenuValue.SAMARBEIDSPARTNER,
        stikkord: 'arbeidsflate-stikkord-om-samarbeidspartner',
    },
];
