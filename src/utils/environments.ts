/* tslint:disable:no-shadowed-variable */
export const verifyWindowObj = () => {
    return typeof window !== 'undefined';
};

export const erNavDekoratoren = (): boolean => {
    return (
        verifyWindowObj() && window.location.href.includes('/nav-dekoratoren')
    );
};

const checkWindowObjIncludes = (searchString: string) => {
    if (verifyWindowObj()) {
        return window.location.origin.toLowerCase().includes(searchString);
    }
    return false;
};

const isLocal = checkWindowObjIncludes('localhost');

const Environments = () => {
    if (process.env.NODE_ENV === 'development') {
        return {
            miljo: 'LOCAL',
            baseUrl: 'http://localhost:3000',
            baseUrlEnonic: 'https://www-x1.nav.no',
            loginUrl: '#',
            logoutUrl: '#',
            menypunkter:
                'http://localhost:8088/person/nav-dekoratoren/api/get/menyvalg',
            minsideArbeidsgiverUrl: 'https://arbeidsgiver-q.nav.no',
            sokeresultat:
                'http://localhost:8088/person/nav-dekoratoren/api/get/sokeresultat',
        };
    }
    if (checkWindowObjIncludes('-q') || checkWindowObjIncludes('-t')) {
        return {
            miljo: 'DEV',
            baseUrl: 'https://www-q0.nav.no',
            baseUrlEnonic: 'https://www-x1.nav.no',
            loginUrl: 'https://loginservice-q.nav.no',
            logoutUrl: 'https://loginservice-q.nav.no/slo',
            menypunkter:
                'https://www-q0.nav.no/person/nav-dekoratoren/api/get/menyvalg',
            minsideArbeidsgiverUrl: 'https://arbeidsgiver-q.nav.no',
            sokeresultat: 'https://www-q0.nav.no/person/nav-dekoratoren/api/get/sokeresultat'
        };
    }
    return {
        miljo: 'PROD',
        baseUrl: 'https://www.nav.no',
        baseUrlEnonic: 'https://www.nav.no',
        loginUrl: 'https://loginservice.nav.no',
        logoutUrl: 'https://loginservice.nav.no/slo',
        menypunkter: 'https://www.nav.no/person/nav-dekoratoren/api/get/menyvalg',
        minsideArbeidsgiverUrl: 'https://arbeidsgiver.nav.no',
        sokeresultat: 'https://www.nav.no/person/nav-dekoratoren/api/get/sokeresultat'
    };
};

export default Environments;
