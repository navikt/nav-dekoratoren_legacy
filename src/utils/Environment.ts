import { FooterLenke } from '../komponenter/footer/Footer-lenker';

export default class Environment {
    static baseUrl: string;
    static baseUrlEnonic: string;
    static innloggingslinjenUrl: string;
    static menypunkter: string;
    static minsideArbeidsgiverUrl: string;
    static sokeresultat: string;
    static varselinnboksUrl: string;
    static dittNavUrl: string;
    static loginUrl: string;
    static logoutUrl: string;

    // Parameters
    static language: string;
    static context: string;
    static stripped: string;
    static redirectToApp: string;
    static level: string;

    static settEnv = (result: any) => {
        Environment.baseUrl = result.baseUrl;
        Environment.baseUrlEnonic = result.baseUrlEnonic;
        Environment.innloggingslinjenUrl = result.innloggingslinjenUrl;
        Environment.menypunkter = result.menypunkter;
        Environment.minsideArbeidsgiverUrl = result.minsideArbeidsgiverUrl;
        Environment.sokeresultat = result.sokeresultat;
        Environment.varselinnboksUrl = result.varselinnboksUrl;
        Environment.dittNavUrl = result.dittNavUrl;
        Environment.loginUrl = result.loginUrl;
        Environment.logoutUrl = result.logoutUrl;

        // Parameters
        Environment.language = result.language;
        Environment.context = result.context;
        Environment.stripped = result.stripped;
        Environment.redirectToApp = result.redirectToApp;
        Environment.level = result.level;
    };
}

export const fetchEnv = () => {
    return new Promise(resolve => {
        const envDom = document.getElementById('decorator-env');
        if (envDom) {
            const url = envDom.getAttribute('data-src');
            if (url) {
                fetch(url)
                    .then(result => result.json())
                    .then(result => {
                        Environment.settEnv(result);
                        resolve(result);
                    })
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
    return lenke.startsWith('/') ? Environment.baseUrlEnonic + lenke : lenke;
};

export const erDev =
    verifyWindowObj() &&
    process.env.NODE_ENV === 'development' &&
    window.location.origin.toLowerCase().includes('localhost');
