const Environments = () => {
    if (process.env.NODE_ENV === 'development') {
        return {
            miljo: 'LOCAL',
            baseUrl: 'http://localhost:8080',
            loginUrl: '#',
            logoutUrl: '#',
        };
    }
    if (window.location.hostname.indexOf('www-q0') > -1) {
        return {
            miljo: 'DEV',
            baseUrl: 'https://www-q0.nav.no',
            logoutUrl: 'https://loginservice-q.nav.no/slo',
        };
    }
    if (window.location.hostname.indexOf('www-q1') > -1) {
        return {
            miljo: 'DEV',
            baseUrl: 'https://www-q1.nav.no',
            logoutUrl: 'https://loginservice-q.nav.no/slo',
        };
    }
    return {
        miljo: 'PROD',
        baseUrl: 'https://www.nav.no',
        logoutUrl: 'https://loginservice.nav.no/slo',
    };
};

export default Environments;
