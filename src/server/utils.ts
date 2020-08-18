import { Request } from 'express';
import { EnvironmentState } from 'store/reducers/environment-duck';
import { MenuValue } from 'utils/meny-storage-utils';
import { Language } from 'store/reducers/language-duck';
import moment from 'moment';

interface Cookies {
    [key: string]: MenuValue | Language | string;
}

interface Props {
    req: Request;
    cookies: Cookies;
}

// Client environment
// Obs! Don't expose secrets
export const clientEnv = ({ req, cookies }: Props): EnvironmentState => {
    const chosenLanguage = (req.query.language?.toString().toUpperCase() ||
        Language.IKKEBESTEMT) as Language;

    const chosenContext = (req.query.context?.toString().toUpperCase() ||
        MenuValue.IKKEBESTEMT) as MenuValue;

    return {
        XP_BASE_URL: process.env.XP_BASE_URL as string,
        APP_BASE_URL: process.env.APP_BASE_URL as string,
        API_VARSELINNBOKS_URL: process.env.API_VARSELINNBOKS_URL as string,
        API_UNLEASH_PROXY_URL: process.env.API_UNLEASH_PROXY_URL as string,
        MINSIDE_ARBEIDSGIVER_URL: process.env
            .MINSIDE_ARBEIDSGIVER_URL as string,
        DITT_NAV_URL: process.env.DITT_NAV_URL as string,
        LOGIN_URL: process.env.LOGIN_URL as string,
        LOGOUT_URL: process.env.LOGOUT_URL as string,
        SERVER_TIME: moment().valueOf(),
        ...(req.query && {
            PARAMS: {
                LANGUAGE: chosenLanguage,
                CONTEXT: chosenContext,
                SIMPLE: req.query.simple === 'true',
                SIMPLE_HEADER: !!req.query.header,
                SIMPLE_FOOTER: !!req.query.footer,
                REDIRECT_TO_APP: !!req.query.redirectToApp,
                LEVEL: (req.query.level || 'Level3') as string,
                FEEDBACK: !(req.query.feedback === 'false'),
                CHATBOT: req.query.chatbot === 'true',
            },
        }),
        ...(cookies && {
            COOKIES: {
                CONTEXT: cookies['decorator-context'] as MenuValue,
                LANGUAGE: cookies['decorator-language'] as Language,
            },
        }),
    };
};

// Time utils
export const fiveMinutesInSeconds = 5 * 60;
export const oneMinuteInSeconds = 60;
export const tenSeconds = 10;
