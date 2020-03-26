import { Request } from 'express';

// Client environment
// Obs! Don't expose secrets
export const clientEnv = (req: Request) => ({
    ...{
        XP_BASE_URL: process.env.XP_BASE_URL,
        APP_BASE_URL: process.env.APP_BASE_URL,
        API_VARSELINNBOKS_URL: process.env.API_VARSELINNBOKS_URL,
        MINSIDE_ARBEIDSGIVER_URL: process.env.MINSIDE_ARBEIDSGIVER_URL,
        DITT_NAV_URL: process.env.DITT_NAV_URL,
        LOGIN_URL: process.env.LOGIN_URL,
        LOGOUT_URL: process.env.LOGOUT_URL,
        ...(req.query && {
            PARAMS: {
                LANGAUGE: req.query.language || 'nb',
                CONTEXT: (req.query.context || 'ikkevalgt').toUpperCase(),
                SIMPLE: req.query.header || req.query.simple || false,
                REDIRECT_TO_APP: req.query.redirectToApp || false,
                LEVEL: req.query.level || 'Level4',
            },
        }),
    },
});
