import React from 'react';
import { MenuValue } from '../nedtrekksmeny/StorageProvider';

export const toppMenyLenker: {
    tittel: string;
    url: string;
    key: MenuValue;
}[] = [
    {
        tittel: 'PRIVATPERSON',
        url: '/person/',
        key: MenuValue.PRIVATPERSON,
    },
    {
        tittel: 'BEDRIFT',
        url: '/bedrift/',
        key: MenuValue.BEDRIFT,
    },
    {
        tittel: 'SAMHANDLING',
        url: '/samhandling/',
        key: MenuValue.SAMHANDLING,
    },
];
