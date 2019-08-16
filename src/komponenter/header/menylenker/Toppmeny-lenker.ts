import { MenuValue } from '../../../provider/Storage-provider';

export const toppmenyLenker: {
    tittel: string;
    url: string;
    key: MenuValue;
}[] = [
    {
        tittel: 'PRIVATPERSON',
        url: '/person/nav-dekoratoren/person/',
        key: MenuValue.PRIVATPERSON,
    },
    {
        tittel: 'BEDRIFT',
        url: '/person/nav-dekoratoren/bedrift/',
        key: MenuValue.BEDRIFT,
    },
    {
        tittel: 'SAMHANDLING',
        url: '/person/nav-dekoratoren/samhandling/',
        key: MenuValue.SAMHANDLING,
    },
];
