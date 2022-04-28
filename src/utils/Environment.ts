import { Environment } from 'store/reducers/environment-duck';
import { getSalesforceContainer } from '../server/utils';

export const fetchEnv = (): Promise<Environment> => {
    return new Promise((resolve) => {
        const envDom =
            document.getElementById('decorator-env') ||
            getSalesforceContainer('c-salesforce-decorator-env', 'decorator-env');
        if (envDom) {
            const url = envDom.getAttribute('data-src');
            if (url) {
                fetch(url, { credentials: 'include' })
                    .then((result) => result.json())
                    .then((result) => resolve(result))
                    .catch((error) => {
                        throw error;
                    });
            }
        } else {
            throw new Error('Fant ikke data-src fra decorator-env i dom');
        }
    });
};

export const verifyWindowObj = () => {
    return typeof window !== 'undefined';
};

export const erNavDekoratoren = (): boolean => {
    return verifyWindowObj() && window.location.href.includes('dekoratoren');
};

export const genererUrl = (XP_BASE_URL: string, lenke: string): string => {
    return lenke.startsWith('/') ? XP_BASE_URL + lenke : lenke;
};

export const erDev =
    verifyWindowObj() &&
    process.env.NODE_ENV === 'development' &&
    window.location.origin.toLowerCase().includes('localhost');
