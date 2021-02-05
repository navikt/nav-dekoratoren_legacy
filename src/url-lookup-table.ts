const urlLookupTable = {
    dev: {
        'https://nav.no': 'https://www.dev.nav.no',
        'https://www.nav.no': 'https://www.dev.nav.no',
        'https://aktivitetsplan.nav.no': 'https://aktivitetsplan-q.nav.no',
        'https://arbeidsgiver.nav.no': 'https://arbeidsgiver-q.nav.no',
        'https://arbeidsplassen.nav.no': 'https://arbeidsplassen-q.nav.no',
        'https://arbeidssokerregistrering.nav.no': 'https://arbeidssokerregistrering-q.nav.no',
        'https://familie.nav.no': 'https://familie.dev.nav.no',
        'https://foreldrepenger.nav.no': 'https://foreldrepenger.dev.nav.no',
        'https://mininnboks.nav.no': 'https://mininnboks.dev.nav.no',
        'https://tjenester.nav.no': 'https://tjenester-q1.nav.no',
        'https://veiledearbeidssoker.nav.no': 'https://www.dev.nav.no/arbeid/no',
        '/_/': 'https://www-q1.nav.no/_/',
    },
    q0: {
        'https://nav.no': 'https://www-q0.nav.no',
        'https://www.nav.no': 'https://www-q0.nav.no',
        'https://aktivitetsplan.nav.no': 'https://aktivitetsplan-q0.nav.no',
        'https://arbeidsgiver.nav.no': 'https://arbeidsgiver-q0.nav.no',
        'https://arbeidsplassen.nav.no': 'https://arbeidsplassen-q0.nav.no',
        'https://arbeidssokerregistrering.nav.no': 'https://arbeidssokerregistrering-q0.nav.no',
        'https://familie.nav.no': 'https://familie-q0.nav.no',
        'https://foreldrepenger.nav.no': 'https://foreldrepenger-q0.nav.no',
        'https://mininnboks.nav.no': 'https://mininnboks-q0.nav.no',
        'https://tjenester.nav.no': 'https://tjenester-q0.nav.no',
        'https://veiledearbeidssoker.nav.no': 'https://veiledearbeidssoker-q0.nav.no',
    },
    q1: {
        'https://nav.no': 'https://www-q1.nav.no',
        'https://www.nav.no': 'https://www-q1.nav.no',
        'https://aktivitetsplan.nav.no': 'https://aktivitetsplan-q1.nav.no',
        'https://arbeidsgiver.nav.no': 'https://arbeidsgiver-q1.nav.no',
        'https://arbeidsplassen.nav.no': 'https://arbeidsplassen-q1.nav.no',
        'https://arbeidssokerregistrering.nav.no': 'https://arbeidssokerregistrering-q1.nav.no',
        'https://familie.nav.no': 'https://familie-q1.nav.no',
        'https://foreldrepenger.nav.no': 'https://foreldrepenger-q1.nav.no',
        'https://mininnboks.nav.no': 'https://mininnboks-q1.nav.no',
        'https://tjenester.nav.no': 'https://tjenester-q1.nav.no',
        'https://veiledearbeidssoker.nav.no': 'https://veiledearbeidssoker-q1.nav.no',
    },
    q2: {
        'https://nav.no': 'https://www-q2.nav.no',
        'https://www.nav.no': 'https://www-q2.nav.no',
        'https://aktivitetsplan.nav.no': 'https://aktivitetsplan-q2.nav.no',
        'https://arbeidsgiver.nav.no': 'https://arbeidsgiver-q2.nav.no',
        'https://arbeidsplassen.nav.no': 'https://arbeidsplassen-q2.nav.no',
        'https://arbeidssokerregistrering.nav.no': 'https://arbeidssokerregistrering-q2.nav.no',
        'https://familie.nav.no': 'https://familie-q2.nav.no',
        'https://foreldrepenger.nav.no': 'https://foreldrepenger-q2.nav.no',
        'https://mininnboks.nav.no': 'https://mininnboks-q2.nav.no',
        'https://tjenester.nav.no': 'https://tjenester-q2.nav.no',
        'https://veiledearbeidssoker.nav.no': 'https://veiledearbeidssoker-q2.nav.no',
    },
    q6: {
        'https://nav.no': 'https://www-q6.nav.no',
        'https://www.nav.no': 'https://www-q6.nav.no',
        'https://aktivitetsplan.nav.no': 'https://aktivitetsplan-q6.nav.no',
        'https://arbeidsgiver.nav.no': 'https://arbeidsgiver-q6.nav.no',
        'https://arbeidsplassen.nav.no': 'https://arbeidsplassen-q6.nav.no',
        'https://arbeidssokerregistrering.nav.no': 'https://arbeidssokerregistrering-q6.nav.no',
        'https://familie.nav.no': 'https://familie-q6.nav.no',
        'https://foreldrepenger.nav.no': 'https://foreldrepenger-q6.nav.no',
        'https://mininnboks.nav.no': 'https://mininnboks-q6.nav.no',
        'https://tjenester.nav.no': 'https://tjenester-q6.nav.no',
        'https://veiledearbeidssoker.nav.no': 'https://veiledearbeidssoker-q6.nav.no',
    },
};

export const getEnvUrl = (path: string, env: string) => {
    let match = undefined;
    // @ts-ignore
    const lookupTable = urlLookupTable[env];
    if (path && lookupTable) {
        Object.keys(lookupTable).some((key) => {
            if (path.startsWith(key)) {
                match = key;
                return true;
            }
            return false;
        });
    }
    return match ? path.replace(match, lookupTable[match]) : path;
};
