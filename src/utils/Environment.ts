import { EnvironmentState } from 'store/reducers/environment-duck';
import { Language } from '../store/reducers/language-duck';

export const fetchEnv = (): Promise<EnvironmentState> => {
    return new Promise((resolve) => {
        const envDom = document.getElementById('decorator-env');
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
            throw 'Fant ikke data-src fra decorator-env i dom';
        }
    });
};

export const verifyWindowObj = () => {
    return typeof window !== 'undefined';
};

export const erNavDekoratoren = (): boolean => {
    return verifyWindowObj() && window.location.href.includes('/dekoratoren');
};

export const genererUrl = (XP_BASE_URL: string, lenke: string): string => {
    return lenke.startsWith('/') ? XP_BASE_URL + lenke : lenke;
};

export const erDev =
    verifyWindowObj() &&
    process.env.NODE_ENV === 'development' &&
    window.location.origin.toLowerCase().includes('localhost');

export const showContextMenu = (
    paramLanguage: Language,
    cookieLanguage: Language,
    urlLanguage: Language
) => {
    if (urlLanguage === Language.IKKEBESTEMT) {
        // Overstyr dersom språk er satt eksplisitt
        if (paramLanguage !== Language.IKKEBESTEMT) {
            return paramLanguage === Language.NORSK;
        }

        // Sjekk om cookien er definert
        if (cookieLanguage) {
            return cookieLanguage === Language.NORSK;
        }

        // Vis menyen ved oppstart
        return true;
    } else {
        return urlLanguage === Language.NORSK;
    }
};
