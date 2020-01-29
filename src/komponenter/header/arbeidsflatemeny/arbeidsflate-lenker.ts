import { MenuValue } from '../../../utils/meny-storage-utils';

export const arbeidsflateLenker: {
    tittel: MenuValue;
    url: string;
    key: MenuValue;
}[] = [
    {
        tittel: MenuValue.PRIVATPERSON,
        url: '/dekoratoren/person/',
        key: MenuValue.PRIVATPERSON,
    },
    {
        tittel: MenuValue.ARBEIDSGIVER,
        url: '/dekoratoren/bedrift/',
        key: MenuValue.ARBEIDSGIVER,
    },
    {
        tittel: MenuValue.SAMARBEIDSPARTNER,
        url: '/dekoratoren/samarbeidspartner/',
        key: MenuValue.SAMARBEIDSPARTNER,
    },
];
