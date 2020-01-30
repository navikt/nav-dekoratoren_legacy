const fs = require('fs');
const path = require('path');

const localenv = JSON.stringify({
    baseUrl: 'http://localhost:3000',
    baseUrlEnonic: 'https://www-q1.nav.no',
    innloggingslinjenUrl: 'http://localhost:3000/innloggingslinje-api/auth',
    menypunkter: `http://localhost:8088/dekoratoren/api/get/menyvalg`,
    minsideArbeidsgiverUrl: `https://arbeidsgiver-q.nav.no/min-side-arbeidsgiver/`,
    sokeresultat: `http://localhost:8088/dekoratoren/api/get/sokeresultat`,
    varselinnboksUrl: `http://localhost:8088/person/varselinnboks`,
    dittNavUrl: `http://localhost:8088/person/dittnav/`,
    loginUrl: '#',
    logoutUrl: '#',
});

const writeEnv = (data, filepath) => {
    if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath);
    }
    const envfile = filepath.concat('/env.json');

    try {
        fs.writeFileSync(envfile, data);
    } catch (err) {
        console.error(err);
    }
};

writeEnv(localenv, path.resolve(__dirname, '../../buildfolder'));
