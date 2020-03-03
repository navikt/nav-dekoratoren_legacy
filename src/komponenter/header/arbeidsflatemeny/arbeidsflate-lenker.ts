import { MenuValue } from '../../../utils/meny-storage-utils';

export interface ArbeidsflateLenke {
    tittelId: string;
    url: string;
    key: MenuValue;
}

export const arbeidsflateLenker: ArbeidsflateLenke[] = [
    {
        tittelId: 'rolle-privatperson',
        url: '/dekoratoren/person/',
        key: MenuValue.PRIVATPERSON,
    },
    {
        tittelId: 'rolle-arbeidsgiver',
        url: '/dekoratoren/bedrift/',
        key: MenuValue.ARBEIDSGIVER,
    },
    {
        tittelId: 'rolle-samarbeidspartner',
        url: '/dekoratoren/samarbeidspartner/',
        key: MenuValue.SAMARBEIDSPARTNER,
    },
];
