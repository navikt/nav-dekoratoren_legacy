import { MenuValue } from '../../../utils/meny-storage-utils';

export const toppmenyLenker: {
    tittel: MenuValue;
    url: string;
    key: MenuValue;
}[] = [
    {
        tittel: MenuValue.PRIVATPERSON,
        url: '/person/nav-dekoratoren/person/',
        key: MenuValue.PRIVATPERSON,
    },
    {
        tittel: MenuValue.BEDRIFT,
        url: '/person/nav-dekoratoren/bedrift/',
        key: MenuValue.BEDRIFT,
    },
    {
        tittel: MenuValue.SAMHANDLER,
        url: '/person/nav-dekoratoren/samhandler/',
        key: MenuValue.SAMHANDLER,
    },
];
