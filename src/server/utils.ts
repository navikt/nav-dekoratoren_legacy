import { Request } from 'express';
import { EnvironmentState } from '../reducer/environment-duck';

// Client environment
// Obs! Don't expose secrets
export const clientEnv = (req: Request): EnvironmentState => ({
    XP_BASE_URL: process.env.XP_BASE_URL as string,
    APP_BASE_URL: process.env.APP_BASE_URL as string,
    API_VARSELINNBOKS_URL: process.env.API_VARSELINNBOKS_URL as string,
    MINSIDE_ARBEIDSGIVER_URL: process.env.MINSIDE_ARBEIDSGIVER_URL as string,
    DITT_NAV_URL: process.env.DITT_NAV_URL as string,
    LOGIN_URL: process.env.LOGIN_URL as string,
    LOGOUT_URL: process.env.LOGOUT_URL as string,
    ...(req.query && {
        PARAMS: {
            LANGUAGE: req.query.language || 'nb',
            CONTEXT: (req.query.context || 'ikkevalgt').toUpperCase(),
            SIMPLE: req.query.simple || false,
            SIMPLE_HEADER: req.query.header || false,
            SIMPLE_FOOTER: req.query.footer || false,
            REDIRECT_TO_APP: req.query.redirectToApp || false,
            LEVEL: req.query.level || 'Level4',
        },
    }),
});
