import React from 'react';
import { MenyVal } from '../nedtrekksmeny/StorageProvider';

export const toppMenyLenker = [
    {
        tittel: 'PRIVATPERSON',
        url: '/person/',
        key: MenyVal.PRIVATPERSON,
    },
    {
        tittel: 'BEDRIFT',
        url: '/bedrift/',
        key: MenyVal.BEDRIFT,
    },
    {
        tittel: 'SAMHANDLING',
        url: '/samhandling/',
        key: MenyVal.SAMHANDLING,
    },
];
