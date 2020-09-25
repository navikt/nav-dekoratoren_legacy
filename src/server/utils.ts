import { Request } from 'express';
import { Environment } from 'store/reducers/environment-duck';
import { MenuValue } from 'utils/meny-storage-utils';
import { AvailableLanguage, Locale } from 'store/reducers/language-duck';
import { Breadcrumb } from '../komponenter/header/common/brodsmulesti/Brodsmulesti';
import moment from 'moment';
import fetch from 'node-fetch';

interface Cookies {
    [key: string]: MenuValue | Locale | string;
}

interface Props {
    req: Request;
    cookies: Cookies;
}

// Client environment
// Obs! Don't expose secrets
type PromiseEnv = Promise<Environment>;
export const clientEnv = async ({ req, cookies }: Props): PromiseEnv => {
    // Throw errors if parameters are invalid
    validateClientEnv(req);

    // Prefetch content
    const alerts = await fetch(
        `${process.env.API_XP_SERVICES_URL}/no.nav.navno/driftsmeldinger`
    ).then((res) => res.json());

    // Deprecated map
    const language = mapToLocale(req.query.language as string);
    const chosenLanguage = (language?.toString().toLowerCase() ||
        Locale.IKKEBESTEMT) as Locale;

    const chosenContext = (req.query.context?.toString().toLowerCase() ||
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
                SIMPLE: req.query.simple === 'true',
                SIMPLE_HEADER: req.query.header === 'true',
                SIMPLE_FOOTER: req.query.footer === 'true',
                ENFORCE_LOGIN: req.query.enforceLogin === 'true',
                REDIRECT_TO_APP: req.query.redirectToApp === 'true',
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
                FEEDBACK: req.query.feedback !== 'false',
                CHATBOT: req.query.chatbot === 'true',
            },
        }),
        ...(cookies && {
            COOKIES: {
                CONTEXT: cookies['decorator-context'] as MenuValue,
                LANGUAGE: cookies['decorator-language'] as Locale,
            },
        }),

        ALERTS: alerts || [],
    };
};

// Validation utils
export const validateClientEnv = (req: Request) => {
    const { level, context } = req.query;
    const { availableLanguages, breadcrumbs } = req.query;
    if (context) {
        validateContext(context as string);
    }
    if (level) {
        validateLevel(level as string);
    }
    const language = mapToLocale(req.query.language as string);
    if (language) {
        validateLanguage(language as Locale);
    }
    if (availableLanguages) {
        validateAvailableLanguages(JSON.parse(availableLanguages as string));
    }
    if (breadcrumbs) {
        validateBreadcrumbs(JSON.parse(breadcrumbs as string));
    }
};

export const validateContext = (context: string) => {
    switch (context) {
        case 'privatperson':
        case 'arbeidsgiver':
        case 'samarbeidspartner':
            break;
        default:
            const error = `context supports privatperson | arbeidsgiver | samarbeidspartner`;
            throw Error(error);
    }
};

export const validateLevel = (level: string) => {
    switch (level) {
        case 'Level3':
        case 'Level4':
            break;
        default:
            const error = 'level supports Level3 | Level4';
            throw Error(error);
    }
};

export const validateLanguage = (language: Locale) => {
    switch (language) {
        case 'nb':
        case 'nn':
        case 'en':
        case 'se':
        case 'pl':
            break;
        default:
            const error = 'language supports nb | nn | en | se | pl';
            throw Error(error);
    }
};

export const validateAvailableLanguages = (languages: AvailableLanguage[]) => {
    languages.forEach((language) => {
        if (!language.url) {
            const error = 'availableLanguages.url supports string';
            throw Error(error);
        }
        switch (language.locale) {
            case 'nb':
            case 'nn':
            case 'en':
            case 'se':
            case 'pl':
                break;
            default:
                const error = `availableLanguages.locale supports nb | nn | en | se | pl`;
                throw Error(error);
        }
    });
};

export const validateBreadcrumbs = (breadcrumbs: Breadcrumb[]) => {
    breadcrumbs.forEach((breadcrumb) => {
        if (!breadcrumb.title) {
            const error = 'breadcrumbs.title supports string';
            throw Error(error);
        }
        if (!breadcrumb.url) {
            const error = 'breadcrumbs.url supports string';
            throw Error(error);
        }
    });
};

// Deprecated map to support norsk | engelsk | samisk
const mapToLocale = (language?: string) => {
    if (!language) {
        return undefined;
    }
    const map: { [key: string]: string } = {
        nb: 'nb',
        nn: 'nn',
        en: 'en',
        se: 'se',
        pl: 'pl',

        // deprecated
        norsk: 'nb',
        engelsk: 'en',
        samisk: 'se',
    };
    return map[language] || 'ukjent-verdi';
};

// Time utils
export const fiveMinutesInSeconds = 5 * 60;
export const oneMinuteInSeconds = 60;
export const tenSeconds = 10;
