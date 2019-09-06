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
        tittel: MenuValue.ARBEIDSGIVER,
        url: '/person/nav-dekoratoren/bedrift/',
        key: MenuValue.ARBEIDSGIVER,
    },
    {
        tittel: MenuValue.SAMARBEIDSPARTNER,
        url: '/person/nav-dekoratoren/samarbeidspartner/',
        key: MenuValue.SAMARBEIDSPARTNER,
    },
];
