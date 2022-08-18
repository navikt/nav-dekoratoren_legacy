import { Request } from 'express';
import { Environment } from 'store/reducers/environment-duck';
import { MenuValue } from 'utils/meny-storage-utils';
import { AvailableLanguage, Locale } from 'store/reducers/language-duck';
import { Breadcrumb } from 'komponenter/header/common/brodsmulesti/Brodsmulesti';

interface Cookies {
    [key: string]: MenuValue | Locale | string;
}

interface Props {
    req: Request;
    cookies: Cookies;
}
// Client environment
// Obs! Don't expose secrets
export const clientEnv = ({ req }: Props): Environment => {
    // Throw errors if parameters are invalid
    validateClientEnv(req);

    // Deprecated map
    const language = mapToLocale(req.query.language as string);
    const chosenLanguage = (language?.toString().toLowerCase() || Locale.IKKEBESTEMT) as Locale;
    const chosenContext = (req.query.context?.toString().toLowerCase() || MenuValue.IKKEBESTEMT) as MenuValue;

    const appUrl = `${process.env.APP_BASE_URL || ``}${process.env.APP_BASE_PATH || ``}` as string;

    return {
        ENV: process.env.ENV as string,
        XP_BASE_URL: process.env.XP_BASE_URL as string,
        APP_URL: appUrl as string,
        APP_BASE_URL: process.env.APP_BASE_URL as string,
        APP_BASE_PATH: process.env.APP_BASE_PATH as string,
        API_VARSELINNBOKS_URL: process.env.API_VARSELINNBOKS_URL as string,
        API_INNLOGGINGSLINJE_URL: process.env.API_INNLOGGINGSLINJE_URL as string,
        API_UNLEASH_PROXY_URL: process.env.API_UNLEASH_PROXY_URL as string,
        OPPORTUNITY_ID: process.env.OPPORTUNITY_ID as string,
        SOLUTION_ID: process.env.SOLUTION_ID as string,
        CASETYPE_ID: process.env.CASETYPE_ID as string,
        NAV_GROUP_ID: process.env.NAV_GROUP_ID as string,
        MINSIDE_ARBEIDSGIVER_URL: process.env.MINSIDE_ARBEIDSGIVER_URL as string,
        DITT_NAV_URL: process.env.DITT_NAV_URL as string,
        MIN_SIDE_URL: process.env.MIN_SIDE_URL as string,
        LOGIN_URL: process.env.LOGIN_URL as string,
        LOGOUT_URL: process.env.LOGOUT_URL as string,
        FEEDBACK_API_URL: process.env.FEEDBACK_API_URL as string,
        ...(req.query && {
            PARAMS: {
                CONTEXT: chosenContext,
                SIMPLE: req.query.simple === 'true',
                SIMPLE_HEADER: req.query.header === 'true' || req.query.simpleHeader === 'true', // 'header'
                SIMPLE_FOOTER: req.query.footer === 'true' || req.query.simpleFooter === 'true', // and 'footer' parameters are kept for legacy compatibility
                ENFORCE_LOGIN: req.query.enforceLogin === 'true',
                REDIRECT_TO_APP: req.query.redirectToApp === 'true',
                REDIRECT_TO_URL: req.query.redirectToUrl as string,
                LEVEL: (req.query.level || 'Level3') as string,
                LANGUAGE: chosenLanguage,
                ...(req.query.availableLanguages && {
                    AVAILABLE_LANGUAGES: JSON.parse(req.query.availableLanguages as string),
                }),
                ...(req.query.breadcrumbs && {
                    BREADCRUMBS: JSON.parse(req.query.breadcrumbs as string),
                }),
                FEEDBACK: req.query.feedback === 'true',
                CHATBOT: req.query.chatbot !== 'false',
                CHATBOT_VISIBLE: req.query.chatbotVisible === 'true',
                URL_LOOKUP_TABLE: req.query.urlLookupTable !== 'false',
                ...(req.query.utilsBackground && {
                    UTILS_BACKGROUND: req.query.utilsBackground as string,
                }),
                SHARE_SCREEN: req.query.shareScreen !== 'false',
                ...(req.query.logoutUrl && {
                    LOGOUT_URL: req.query.logoutUrl as string,
                }),
            },
        }),
    };
};

export const orginDevelopment = (hosturl?: string) => ['localhost', 'dev'].some((o) => hosturl?.includes(o));

// Validation utils
export const validateClientEnv = (req: Request) => {
    const { level, context, availableLanguages, breadcrumbs, utilsBackground, logoutUrl, redirectToUrl } = req.query;
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
    if (utilsBackground) {
        validateUtilsBackground(utilsBackground as string);
    }
    if (logoutUrl) {
        validateLogoutUrl(logoutUrl as string);
    }
    if (redirectToUrl) {
        validateRedirectUrl(redirectToUrl as string);
    }
};

export const validateLogoutUrl = (url: string) => {
    if (!isNavUrl(url)) {
        const error = `logoutUrl supports only nav.no urls - failed to validate ${url}`;
        throw Error(error);
    }
};

export const validateRedirectUrl = (url: string) => {
    if (!isNavUrl(url)) {
        const error = `redirectToUrl supports only nav.no urls - failed to validate ${url}`;
        throw Error(error);
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

export const validateUtilsBackground = (background: string) => {
    switch (background) {
        case 'gray':
        case 'white':
        case 'transparent':
            break;
        default:
            const error = `utilsBackground supports gray | white | transparent`;
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
        case 'uk':
        case 'ru':
            break;
        default:
            const error = 'language supports nb | nn | en | se | pl | uk | ru';
            throw Error(error);
    }
};

export const validateAvailableLanguages = (languages: AvailableLanguage[]) => {
    languages.forEach((language) => {
        if (!language.handleInApp) {
            if (!language.url) {
                const error = 'language.url is required when handleInApp is false';
                throw Error(error);
            }
            if (!isNavUrl(language.url)) {
                const error = `language.url supports only nav.no urls or relative urls - failed to validate ${language.url}`;
                throw Error(error);
            }
        }

        validateLanguage(language.locale);
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
        if (!isNavUrl(breadcrumb.url)) {
            const error = `breadcrumbs.url supports only nav.no urls - failed to validate ${breadcrumb.url}`;
            throw Error(error);
        }
    });
};

// Validator utils
export const isNavUrl = (url: string) => {
    const isLocalhost = /^(https?:\/\/localhost(:\d+)?)/i.test(url);
    const isPath = /^(\/)/i.test(url);
    const isNavOrNais = /^((https:\/\/([a-z0-9-]+[.])*((nav[.]no)|(nais[.]io)))($|\/))/i.test(url);

    return isLocalhost || isPath || isNavOrNais;
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
        uk: 'uk',
        ru: 'ru',

        // deprecated
        norsk: 'nb',
        engelsk: 'en',
        samisk: 'se',
    };
    return map[language] || 'ukjent-verdi';
};

// Salesforce frontend apps have some restrictions on which elements can be
// accessed/mutatated. This function is used as a fallback to get certain
// containers
export const getSalesforceContainer = (_tagName: string, className: string) => {
    // The "c-" prefix on tags is required by salesforce
    const tagName = _tagName.startsWith('c-') ? _tagName : `c-${_tagName}`;

    const tag = document.getElementsByTagName(tagName)[0];
    if (!tag) {
        return null;
    }

    return tag.getElementsByClassName(className)[0];
};

// Time utils
export const fiveMinutesInSeconds = 5 * 60;
export const oneMinuteInSeconds = 60;
export const tenSeconds = 10;
