import { MenuValue } from '../../../utils/meny-storage-utils';

export const arbeidsflateLenker: {
    tittel: MenuValue;
    url: string;
    key: MenuValue;
    stikkord: string;
}[] = [
    {
        tittel: MenuValue.PRIVATPERSON,
        url: '/dekoratoren/person/',
        key: MenuValue.PRIVATPERSON,
        stikkord: 'arbeidsflate-stikkord-om-privatperson',
    },
    {
        tittel: MenuValue.ARBEIDSGIVER,
        url: '/dekoratoren/bedrift/',
        key: MenuValue.ARBEIDSGIVER,
        stikkord: 'arbeidsflate-stikkord-om-arbeidsgiver',
    },
    {
        tittel: MenuValue.SAMARBEIDSPARTNER,
        url: '/dekoratoren/samarbeidspartner/',
        key: MenuValue.SAMARBEIDSPARTNER,
        stikkord: 'arbeidsflate-stikkord-om-samarbeidspartner',
    },
];
