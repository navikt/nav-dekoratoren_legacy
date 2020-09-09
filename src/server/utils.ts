import { Request } from 'express';
import { EnvironmentState } from 'store/reducers/environment-duck';
import { MenuValue } from 'utils/meny-storage-utils';
import { Locale } from 'store/reducers/language-duck';
import moment from 'moment';

interface Cookies {
    [key: string]: MenuValue | Locale | string;
}

interface Props {
    req: Request;
    cookies: Cookies;
}

// Client environment
// Obs! Don't expose secrets
export const clientEnv = ({ req, cookies }: Props): EnvironmentState => {

    // Throw errors if parameters are invalid
    validateClientEnv(req);

    const chosenLanguage = (req.query.language?.toString().toUpperCase() ||
        Locale.IKKEBESTEMT) as Locale;

    const chosenContext = (req.query.context?.toString().toUpperCase() ||
        MenuValue.IKKEBESTEMT) as MenuValue;

    const appUrl = `${process.env.APP_BASE_URL || ``}${
        process.env.APP_BASE_PATH || ``
    }` as string;

    return {
        XP_BASE_URL: process.env.XP_BASE_URL as string,
        APP_URL: appUrl as string,
        APP_BASE_URL: process.env.APP_BASE_URL as string,
        APP_BASE_PATH: process.env.APP_BASE_PATH as string,
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
                CONTEXT: chosenContext,
                SIMPLE: !!req.query.simple,
                SIMPLE_HEADER: !!req.query.header,
                SIMPLE_FOOTER: !!req.query.footer,
                ENFORCE_LOGIN: !!req.query.enforceLogin,
                REDIRECT_TO_APP: !!req.query.redirectToApp,
                LEVEL: (req.query.level || 'Level3') as string,
                LANGUAGE: chosenLanguage,
                ...(req.query.availableLanguages && {
                    AVAILABLE_LANGUAGES: JSON.parse(
                        req.query.availableLanguages as string
                    ),
                }),
                ...(req.query.breadcrumbs && {
                    BREADCRUMBS: JSON.parse(req.query.breadcrumbs as string),
                }),
                FEEDBACK: !!req.query.feedback,
                CHATBOT: !!req.query.chatbot,
            },
        }),
        ...(cookies && {
            COOKIES: {
                CONTEXT: cookies['decorator-context'] as MenuValue,
                LANGUAGE: cookies['decorator-language'] as Locale,
            },
        }),
    };
};

// Validation utils
export const validateClientEnv = (req: Request) => {
    const {level, language, context, availableLanguages} = req.query;
    if (context) {
        validateContext(context as string);
    }
    if (level) {
        validateLevel(level as string);
    }
    if (language) {
        validateLanguage(language as string);
    }
    if (availableLanguages) {
        validateAvailableLanguages(availableLanguages as string);
    }
}

export const validateContext = (context: string) => {
    switch (context) {
        case 'privatperson':
        case 'arbeidsgiver':
        case 'samarbeidspartner':
            break;
        default:
            const error = 'context supports privatperson | arbeidsgiver | samarbeidspartner';
            throw(Error(error));
    }
}

export const validateLevel = (level: string) => {
    switch (level) {
        case 'Level3':
        case 'Level4':
            break;
        default:
            const error = 'level supports Level3 | Level4';
            throw(Error(error));
    }
}

export const validateLanguage = (language: string) => {
    switch (language) {
        case 'nb':
        case 'nn':
        case 'en':
        case 'se':
            break;
        default:
            const error = 'language supports nb | nn | en | se';
            throw(Error(error));
    }
}

export const validateAvailableLanguages = (availableLanguages: string) => {
    const languages = JSON.parse(availableLanguages as string);
    languages.map((language: {locale: string, url: string}) => {
        switch (language.locale) {
            case 'nb':
            case 'nn':
            case 'en':
            case 'se':
                break;
            default:
                const error = 'availableLanguages.locale supports nb | nn | en | se';
                throw(Error(error));
        }
    });

}

// Time utils
export const fiveMinutesInSeconds = 5 * 60;
export const oneMinuteInSeconds = 60;
export const tenSeconds = 10;
