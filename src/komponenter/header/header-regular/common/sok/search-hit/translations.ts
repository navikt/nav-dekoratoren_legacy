import { Language } from '../utils';

const translations = {
    no: {
        published: 'Publisert',
        lastModified: 'Oppdatert',
        person: 'Privatperson',
        employer: 'Arbeidsgiver',
        provider: 'Samarbeidspartner',
        other: 'Annet',
    },
    nn: {
        published: 'Publisert',
        lastModified: 'Oppdatert',
        person: 'Privatperson',
        employer: 'Arbeidsgivar',
        provider: 'Samarbeidspartnar',
        other: 'Anna',
    },
    en: {
        published: 'Published',
        lastModified: 'Updated',
        person: 'Individuals',
        employer: 'Employers',
        provider: 'Partners',
        other: 'Other',
    },
    se: {
        // Mangler et par oversettelser her.
        // Disse står på lista og vil bli tatt med i neste bestilling.
        published: 'Publisert',
        lastModified: 'Oppdatert',
        person: 'Priváhtaolmmoš',
        employer: 'Bargoaddi',
        provider: 'Ovttasbargoguoibmi',
        other: 'Annet',
    },
};

export const getTranslations = (language: Language) => {
    return translations[language] || translations['no'];
};
