import { FooterLenke } from '../komponenter/footer/Footer-lenker';
import { EnvironmentState } from '../reducer/environment-duck';
import getStore from '../redux/store';

export const Environment = () => getStore().getState().environment;
export default Environment;
export const fetchEnv = (): Promise<EnvironmentState> => {
    return new Promise(resolve => {
        const envDom = document.getElementById('decorator-env');
        if (envDom) {
            const url = envDom.getAttribute('data-src');
            if (url) {
                fetch(url)
                    .then(result => result.json())
                    .then(result => resolve(result))
                    .catch(error => {
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

export const genererLenkerTilUrl = (footerlenker: FooterLenke[]) => {
    const lenker = footerlenker.map(lenke => {
        lenke.url = genererUrl(lenke.url);
        return lenke;
    });
    return lenker;
};

export const genererUrl = (lenke: string): string => {
    return lenke.startsWith('/') ? Environment().XP_BASE_URL + lenke : lenke;
};

export const erDev =
    verifyWindowObj() &&
    process.env.NODE_ENV === 'development' &&
    window.location.origin.toLowerCase().includes('localhost');
