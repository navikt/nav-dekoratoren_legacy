import { Request } from 'express';
import { Environment } from 'store/reducers/environment-duck';
import { MenuValue } from 'utils/meny-storage-utils';
import { AvailableLanguage, Locale } from 'store/reducers/language-duck';
import { Breadcrumb } from 'komponenter/header/common/brodsmulesti/Brodsmulesti';
import { parseJwt } from 'komponenter/common/utloggingsvarsel/token.utils';
import {
    ParsedJwtToken,
    UtloggingsVarselProperties,
    UtloggingsvarselState,
    initialState as UtloggingsvarselInitState,
} from '../store/reducers/utloggingsvarsel-duck';
import { CookieName, getCookieContextKey } from './cookieSettings';

interface Cookies {
    [key: string]: MenuValue | Locale | string;
}

interface Props {
    req: Request;
    cookies: Cookies;
}
// Client environment
// Obs! Don't expose secrets
export const clientEnv = ({ req, cookies }: Props): Environment => {
    // Throw errors if parameters are invalid
    validateClientEnv(req);

    // Deprecated map
    const language = mapToLocale(req.query.language as string);
    const chosenLanguage = (language?.toString().toLowerCase() || Locale.IKKEBESTEMT) as Locale;
    const chosenContext = (req.query.context?.toString().toLowerCase() || MenuValue.IKKEBESTEMT) as MenuValue;

    const appUrl = `${process.env.APP_BASE_URL || ``}${process.env.APP_BASE_PATH || ``}` as string;
    const utloggingsvarsel: UtloggingsVarselProperties = setAndCheckUtloggingsvarsel(req, cookies);
    const taSurveys = req.query.taSurveys?.toString().replace(' ', '').split(',') || [];

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
        MINSIDE_ARBEIDSGIVER_URL: process.env.MINSIDE_ARBEIDSGIVER_URL as string,
        DITT_NAV_URL: process.env.DITT_NAV_URL as string,
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
                URL_LOOKUP_TABLE: req.query.urlLookupTable !== 'false',
                ...(req.query.utilsBackground && {
                    UTILS_BACKGROUND: req.query.utilsBackground as string,
                }),
                SHARE_SCREEN: req.query.shareScreen !== 'false',
                UTLOGGINGSVARSEL: utloggingsvarsel.UTLOGGINGSVARSEL,
                TA_SURVEYS: taSurveys,
                ...(req.query.logoutUrl && {
                    LOGOUT_URL: req.query.logoutUrl as string,
                }),
            },
        }),
    };
};

const setAndCheckUtloggingsvarsel = (req: Request, cookies: Cookies): UtloggingsVarselProperties => {
    const jwtTokenInfo: ParsedJwtToken = getutloggingsvarsel(req, cookies);
    const utloggingsvarselCookie: UtloggingsvarselState = getLogoutWarningCookie(req, cookies);

    if (jwtTokenInfo.UTLOGGINGSVARSEL && jwtTokenInfo.TIMESTAMP !== utloggingsvarselCookie.timeStamp) {
        utloggingsvarselCookie.timeStamp = jwtTokenInfo.TIMESTAMP ?? 0;
        utloggingsvarselCookie.origin = req.headers?.host ?? '';
        utloggingsvarselCookie.modalLukketAvBruker = false;
        utloggingsvarselCookie.vistSistePaminnelse = false;
        utloggingsvarselCookie.miljo = getCookieContextKey(process.env.XP_BASE_URL ?? req.headers?.referer ?? '');
    }
    return { UTLOGGINGSVARSEL: jwtTokenInfo.UTLOGGINGSVARSEL, state: utloggingsvarselCookie };
};

const getLogoutWarningCookie = (req: Request, cookies: Cookies): UtloggingsvarselState => {
    const logoutWarning = cookies[CookieName.DECORATOR_LOGOUT_WARNING];
    if (logoutWarning) {
        try {
            return JSON.parse(logoutWarning) as UtloggingsvarselState;
        } catch (err) {
            console.log("Failed to parse cookies['" + CookieName.DECORATOR_LOGOUT_WARNING + "']: ", err);
            return UtloggingsvarselInitState;
        }
    }
    return UtloggingsvarselInitState;
};

export const orginDevelopment = (hosturl?: string) =>
    ['localhost', '-q0', '-q1', '-q2', '-q6', 'dev'].some((o) => hosturl?.includes(o));

const getutloggingsvarsel = (req: Request, cookies: Cookies): ParsedJwtToken => {
    const enableUtloggingsvarsel: boolean =
        req.query.utloggingsvarsel === 'true' ||
        (req.query.utloggingsvarsel !== 'false' && orginDevelopment(req.headers?.referer));

    if (enableUtloggingsvarsel) {
        const token = cookies[CookieName.SELVBETJENING_IDTOKEN];
        if (token) {
            try {
                const jwt = parseJwt(token);
                const timestamp = jwt['exp'];
                if (timestamp) {
                    return {
                        UTLOGGINGSVARSEL: true,
                        TIMESTAMP: timestamp,
                    };
                }
            } catch (err) {
                console.warn('parsing selvbetjening-idtoken failed: ', err);
            }
        }
    }
    return {
        UTLOGGINGSVARSEL: enableUtloggingsvarsel,
        TIMESTAMP: 0,
    };
};

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
            break;
        default:
            const error = 'language supports nb | nn | en | se | pl';
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
        if (!isNavUrl(breadcrumb.url)) {
            const error = `breadcrumbs.url supports only nav.no urls - failed to validate ${breadcrumb.url}`;
            throw Error(error);
        }
    });
};

// Validator utils
export const isNavUrl = (url: string) =>
    /^(\/|(https?:\/\/localhost)|(https:\/\/([a-z0-9-]+[.])*nav[.]no($|\/)))/i.test(url);

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
