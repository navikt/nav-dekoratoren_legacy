import { MenyPunkter } from '../../../../../../reducer/menu-duck';
import Environment from '../../../../../../utils/Environment';
import { Status } from '../../../../../../api/api';

export const getMinsideMenyPunkter = (): MenyPunkter => {
    const baseUrl = Environment.XP_BASE_URL;
    const tjenesterUrl = baseUrl.replace('www', 'tjenester');

    return ({
        status: Status.OK,
        data: [{
            displayName: 'Ditt NAV',
            path: '/person/dittnav',
            hasChildren: true,
            children: [
                {
                    displayName: 'Din oversikt',
                    path: '/',
                    hasChildren: true,
                    children: [
                        {
                            displayName: 'Dine saker',
                            path: `${tjenesterUrl}/saksoversikt`,
                            hasChildren: false,
                            children: [],
                        },
                        {
                            displayName: 'Din innboks',
                            path: `${tjenesterUrl}/mininnboks`,
                            hasChildren: false,
                            children: [],
                        },
                        {
                            displayName: 'Dine utbetalinger',
                            path: `${tjenesterUrl}/utbetalingsoversikt`,
                            hasChildren: false,
                            children: [],
                        },
                        {
                            displayName: 'Endre kontonummer/adresse',
                            path: `${tjenesterUrl}/brukerprofil`,
                            hasChildren: false,
                            children: [],
                        },
                        {
                            displayName: 'Send ny søknad',
                            path: `/soknader`,
                            hasChildren: false,
                            children: [],
                        },
                        {
                            displayName: 'Ettersend vedlegg',
                            path: `/ettersendelse`,
                            hasChildren: false,
                            children: [],
                        },
                        {
                            displayName: 'Send beskjed til NAV',
                            path: `/person/kontakt-oss`,
                            hasChildren: false,
                            children: [],
                        },
                        {
                            displayName: 'Personopplysninger',
                            path: `/person/personopplysninger`,
                            hasChildren: false,
                            children: [],
                        },
                    ],
                },
                {
                    displayName: 'Arbeid',
                    path: '/',
                    hasChildren: true,
                    children: [
                        {
                            displayName: 'Registrer deg som arbeidssøker',
                            path: `${tjenesterUrl}/veiledearbeidssoker/mistet-jobben/registrering`,
                            hasChildren: false,
                            children: [],
                        },
                        {
                            displayName: 'Send meldekort',
                            path: `/meldekort`,
                            hasChildren: false,
                            children: [],
                        },
                        {
                            displayName: 'Finn ledige stillinger',
                            path: `https://arbeidsplassen.nav.no/stillinger`,
                            hasChildren: false,
                            children: [],
                        },
                        {
                            displayName: 'Din CV',
                            path: `https://arbeidsplassen.nav.no/minside`,
                            hasChildren: false,
                            children: [],
                        },
                        {
                            displayName: 'Dine lagrede søk',
                            path: `https://stillingssok.nav.no/pam-stillingsok/lagrede-sok`,
                            hasChildren: false,
                            children: [],
                        },
                        {
                            displayName: 'Din aktivitetsplan',
                            path: `${tjenesterUrl}/aktivitetsplan`,
                            hasChildren: false,
                            children: [],
                        },
                    ],
                },
                {
                    displayName: 'Flere tjenester',
                    path: '/',
                    hasChildren: true,
                    children: [
                        {
                            displayName: 'Din pensjon',
                            path: `${tjenesterUrl}/pselv/publisering/dinpensjon.jsf?context=pensjon`,
                            hasChildren: false,
                            children: [],
                        },
                        {
                            displayName: 'Din uføretrygd',
                            path: `${tjenesterUrl}/pselv/publisering/uforetrygd.jsf?context=ut`,
                            hasChildren: false,
                            children: [],
                        },
                        {
                            displayName: 'Ditt sykefravær',
                            path: `${tjenesterUrl}/sykefravaer`,
                            hasChildren: false,
                            children: [],
                        },
                        {
                            displayName: 'Dine foreldrepenger',
                            path: `https://foreldrepenger.nav.no`,
                            hasChildren: false,
                            children: [],
                        },
                    ],
                },
            ],
        }],
    });
};
