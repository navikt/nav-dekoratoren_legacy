import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenypunkter } from 'store/reducers/menu-duck';
import { MenuValue } from 'utils/meny-storage-utils';
import { HeaderSimple } from 'komponenter/header/header-simple/HeaderSimple';
import { HeaderRegular } from 'komponenter/header/header-regular/HeaderRegular';
import { AppState } from 'store/reducers';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { cookieOptions } from 'store/reducers/arbeidsflate-duck';
import { useCookies } from 'react-cookie';
import { languageDuck, Locale } from 'store/reducers/language-duck';
import { HeadElements } from 'komponenter/common/HeadElements';
import { hentVarsler } from 'store/reducers/varselinnboks-duck';
import { hentInnloggingsstatus } from 'store/reducers/innloggingsstatus-duck';
import { fetchDriftsmeldinger } from 'store/reducers/driftsmeldinger-duck';
import { fetchFeatureToggles, Status } from 'api/api';
import { ActionType } from 'store/actions';
import { loadVergic } from 'utils/external-scripts';
import { BrowserSupportMsg } from 'komponenter/header/header-regular/common/browser-support-msg/BrowserSupportMsg';
import { getLoginUrl } from 'utils/login';
import Driftsmeldinger from './common/driftsmeldinger/Driftsmeldinger';
import Brodsmulesti from './common/brodsmulesti/Brodsmulesti';
import { msgSafetyCheck, postMessageToApp } from '../../utils/messages';
import { SprakVelger } from './common/sprakvelger/SprakVelger';
import { validateAvailableLanguages, validateUtilsBackground } from '../../server/utils';
import { validateBreadcrumbs } from '../../server/utils';
import { validateContext } from '../../server/utils';
import { validateLanguage, validateLevel } from '../../server/utils';
import { setParams } from '../../store/reducers/environment-duck';
import Modal from 'nav-frontend-modal';
import { getUrlFromLookupTable } from '@navikt/nav-dekoratoren-moduler';
import './Header.less';
import cls from 'classnames';

export const unleashCacheCookie = 'decorator-unleash-cache';
export const decoratorContextCookie = 'decorator-context';
export const decoratorLanguageCookie = 'decorator-language';

const stateSelector = (state: AppState) => ({
    menypunkt: state.menypunkt,
    innloggingsstatus: state.innloggingsstatus,
    arbeidsflate: state.arbeidsflate.status,
    language: state.language.language,
    featureToggles: state.featureToggles,
    environment: state.environment,
});

export const Header = () => {
    const dispatch = useDispatch();
    const [sentAuthToApp, setSentAuthToApp] = useState(false);
    const { environment } = useSelector(stateSelector);
    const { arbeidsflate } = useSelector(stateSelector);
    const { innloggingsstatus, menypunkt } = useSelector(stateSelector);
    const { authenticated } = innloggingsstatus.data;
    const { PARAMS, APP_URL, API_UNLEASH_PROXY_URL, API_INNLOGGINGSLINJE_URL, ENV } = environment;
    const currentFeatureToggles = useSelector(stateSelector).featureToggles;
    const breadcrumbs = PARAMS.BREADCRUMBS || [];
    const availableLanguages = PARAMS.AVAILABLE_LANGUAGES || [];

    const [cookies, setCookie] = useCookies([decoratorLanguageCookie, decoratorContextCookie, unleashCacheCookie]);

    // Map prod to dev urls with url-lookup-table
    const setUrlLookupTableUrls = () => {
        const anchors = Array.prototype.slice.call(document.getElementsByTagName('a'));
        anchors.forEach((anchor) => {
            const envUrl = getUrlFromLookupTable(anchor.href, ENV as 'dev' | 'q0' | 'q1' | 'q2' | 'q6');
            if (anchor.href !== envUrl) {
                anchor.href = envUrl;
            }
        });
    };

    useEffect(() => {
        if (ENV && PARAMS.URL_LOOKUP_TABLE && ENV !== 'localhost' && ENV !== 'prod') {
            // Initial change
            setUrlLookupTableUrls();

            // After dom changes
            const targetNode = document.body;
            const config = { attributes: true, childList: true, subtree: true };
            const callback = () => setUrlLookupTableUrls();

            const observer = new MutationObserver(callback);
            observer.observe(targetNode, config);
            return () => {
                observer.disconnect();
            };
        }
    }, [menypunkt]);

    // React-modal fix
    useEffect(() => {
        Modal.setAppElement('body');
    }, []);

    // Handle feature toggles
    useEffect(() => {
        if (currentFeatureToggles['dekoratoren.skjermdeling']) {
            loadVergic();
        }
    }, [currentFeatureToggles]);

    // Handle enforced login
    useEffect(() => {
        const { status, data } = innloggingsstatus;
        if (PARAMS.ENFORCE_LOGIN && status === Status.OK) {
            const { authenticated, securityLevel } = data;
            const insufficientPrivileges = PARAMS.LEVEL === 'Level4' && securityLevel === '3';

            if (!authenticated || insufficientPrivileges) {
                window.location.href = getLoginUrl(environment, arbeidsflate);
            } else if (!sentAuthToApp) {
                postMessageToApp('auth', data);
                setSentAuthToApp(true);
            }
        }
    }, [PARAMS.ENFORCE_LOGIN, PARAMS.LEVEL, innloggingsstatus]);

    // Handle external data
    useEffect(() => {
        fetchDriftsmeldinger(APP_URL)(dispatch);
        hentInnloggingsstatus(API_INNLOGGINGSLINJE_URL)(dispatch);
        fetchMenypunkter(APP_URL)(dispatch);
        if (Object.keys(currentFeatureToggles).length) {
            const togglesFromCookie = cookies[unleashCacheCookie];
            if (togglesFromCookie) {
                dispatch({
                    type: ActionType.SETT_FEATURE_TOGGLES,
                    data: togglesFromCookie,
                });
            } else {
                fetchFeatureToggles(API_UNLEASH_PROXY_URL, currentFeatureToggles)
                    .then((updatedFeatureToggles) => {
                        dispatch({
                            type: ActionType.SETT_FEATURE_TOGGLES,
                            data: updatedFeatureToggles,
                        });
                        setCookie(unleashCacheCookie, updatedFeatureToggles, {
                            maxAge: 100,
                            domain: '.nav.no',
                            path: '/',
                        });
                    })
                    .catch((error) => {
                        console.error(`Failed to fetch feature-toggles: ${error}`);
                    });
            }
        }
    }, []);

    // Change context
    useEffect(() => {
        const fromParam = PARAMS.CONTEXT;
        const fromCookie = cookies[decoratorContextCookie];
        const fromDefault = MenuValue.PRIVATPERSON;

        if (fromParam !== MenuValue.IKKEBESTEMT) {
            setContext(fromParam);
        } else if (fromCookie) {
            setContext(fromCookie);
        } else {
            setContext(fromDefault);
        }
    }, []);

    const setContext = (context: MenuValue) => {
        dispatch(settArbeidsflate(context));
        setCookie(decoratorContextCookie, context, cookieOptions);
    };

    // Fetch notifications
    useEffect(() => {
        if (authenticated) {
            hentVarsler(APP_URL)(dispatch);
        }
    }, [authenticated]);

    // Change language
    useEffect(() => {
        const fromParam = PARAMS.LANGUAGE;
        const fromUrl = getLanguageFromUrl();
        const fromCookie = cookies[decoratorLanguageCookie];
        const fromDefault = Locale.BOKMAL;

        // Priority: Parameter -> url -> cookie -> default
        if (fromParam !== Locale.IKKEBESTEMT) {
            setLanguage(fromParam);
        } else if (fromUrl !== Locale.IKKEBESTEMT) {
            setLanguage(fromUrl);
        } else if (fromCookie) {
            setLanguage(fromCookie);
        } else {
            setLanguage(fromDefault);
        }
    }, []);

    const setLanguage = (locale: Locale) => {
        dispatch(languageDuck.actionCreator({ language: locale }));
        setCookie(decoratorLanguageCookie, locale, cookieOptions);
    };

    // Send ready message to applications
    useEffect(() => {
        const receiveMessage = (msg: MessageEvent) => {
            const { data } = msg;
            const isSafe = msgSafetyCheck(msg);
            const { source, event } = data;
            if (isSafe) {
                if (source === 'decoratorClient' && event === 'ready') {
                    window.postMessage({ source: 'decorator', event: 'ready' }, window.location.origin);
                }
            }
        };
        window.addEventListener('message', receiveMessage, false);
        return () => {
            window.removeEventListener('message', receiveMessage, false);
        };
    }, []);

    // Receive params from frontend-apps
    useEffect(() => {
        const receiveMessage = (msg: MessageEvent) => {
            const { data } = msg;
            const isSafe = msgSafetyCheck(msg);
            const { source, event, payload } = data;
            if (isSafe) {
                if (source === 'decoratorClient' && event === 'params') {
                    const { simple, context, level, language } = payload;
                    const { availableLanguages, breadcrumbs } = payload;
                    const { enforceLogin, redirectToApp } = payload;
                    const { feedback, chatbot } = payload;
                    const { utilsBackground } = payload;
                    if (context) {
                        validateContext(context);
                        setContext(context);
                    }
                    if (language) {
                        validateLanguage(language);
                        setLanguage(language);
                    }
                    if (level) {
                        validateLevel(level);
                    }
                    if (availableLanguages) {
                        validateAvailableLanguages(availableLanguages);
                    }
                    if (breadcrumbs) {
                        validateBreadcrumbs(breadcrumbs);
                    }
                    if (utilsBackground) {
                        validateUtilsBackground(utilsBackground);
                    }
                    const params = {
                        ...(context && {
                            CONTEXT: context,
                        }),
                        ...(simple !== undefined && {
                            SIMPLE: simple === true,
                        }),
                        ...(enforceLogin !== undefined && {
                            ENFORCE_LOGIN: enforceLogin === true,
                        }),
                        ...(redirectToApp !== undefined && {
                            REDIRECT_TO_APP: redirectToApp === true,
                        }),
                        ...(level && {
                            LEVEL: level,
                        }),
                        ...(language && {
                            LANGUAGE: language,
                        }),
                        ...(availableLanguages && {
                            AVAILABLE_LANGUAGES: availableLanguages,
                        }),
                        ...(breadcrumbs && {
                            BREADCRUMBS: breadcrumbs,
                        }),
                        ...(feedback !== undefined && {
                            FEEDBACK: feedback === true,
                        }),
                        ...(chatbot !== undefined && {
                            CHATBOT: chatbot === true,
                        }),
                        ...(utilsBackground && {
                            UTILS_BACKGROUND: utilsBackground,
                        }),
                    };
                    dispatch(setParams(params));
                }
            }
        };
        window.addEventListener('message', receiveMessage, false);
        return () => {
            window.removeEventListener('message', receiveMessage, false);
        };
    }, []);

    const utilsBackgroundClassMap: { [key: string]: string } = {
        white: 'decorator-utils-container--white',
        gray: 'decorator-utils-container--gray',
    };

    return (
        <div className={'decorator-wrapper'}>
            <HeadElements />
            <span id={'top-element'} tabIndex={-1} />
            <BrowserSupportMsg />
            <header className="siteheader">
                {PARAMS.SIMPLE || PARAMS.SIMPLE_HEADER ? <HeaderSimple /> : <HeaderRegular />}
            </header>
            <Driftsmeldinger />
            {(breadcrumbs.length > 0 || availableLanguages.length > 0) && (
                // Klassen "decorator-utils-container" brukes av appene til å sette bakgrunn
                <div
                    className={cls(
                        'decorator-utils-container',
                        PARAMS.UTILS_BACKGROUND && utilsBackgroundClassMap[PARAMS.UTILS_BACKGROUND]
                    )}
                >
                    <div className={'decorator-utils-content'}>
                        {breadcrumbs.length > 0 && <Brodsmulesti breadcrumbs={breadcrumbs} />}
                        {availableLanguages.length > 0 && <SprakVelger languages={availableLanguages} />}
                    </div>
                </div>
            )}
        </div>
    );
};

const getLanguageFromUrl = (): Locale => {
    const locationPath = window.location.pathname;
    if (locationPath.includes('/no/')) {
        return Locale.BOKMAL;
    }
    if (locationPath.includes('/nb/')) {
        return Locale.BOKMAL;
    }
    if (locationPath.includes('/nn/')) {
        return Locale.NYNORSK;
    }
    if (locationPath.includes('/en/')) {
        return Locale.ENGELSK;
    }
    if (locationPath.includes('/se/')) {
        return Locale.SAMISK;
    }
    if (locationPath.includes('/pl/')) {
        return Locale.POLSK;
    }
    return Locale.IKKEBESTEMT;
};

export default Header;
