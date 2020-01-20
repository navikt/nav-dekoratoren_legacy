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

export const erDev =
    verifyWindowObj() &&
    process.env.NODE_ENV === 'development' &&
    window.location.origin.toLowerCase().includes('localhost');

export const localEnv = {
    baseUrl: 'http://localhost:3000',
    baseUrlEnonic: 'https://www-x1.nav.no',
    innloggingslinjenUrl: 'http://localhost:3000/innloggingslinje-api/auth',
    menypunkter: `http://localhost:8088/dekoratoren/api/get/menyvalg`,
    minsideArbeidsgiverUrl: `https://arbeidsgiver-q.nav.no/min-side-arbeidsgiver/`,
    sokeresultat: `http://localhost:8088/dekoratoren/api/get/sokeresultat`,
    varselinnboksUrl: `http://localhost:8088/person/varselinnboks`,
    dittNavUrl: `http://localhost:8088/person/dittnav/`,
    loginUrl: '#',
    logoutUrl: '#',
};
