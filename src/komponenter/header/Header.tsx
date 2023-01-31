import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenypunkter } from 'store/reducers/menu-duck';
import { MenuValue } from 'utils/meny-storage-utils';
import { HeaderSimple } from 'komponenter/header/header-simple/HeaderSimple';
import { HeaderRegular } from 'komponenter/header/header-regular/HeaderRegular';
import { AppState } from 'store/reducers';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { CookieName, cookieOptions } from '../../server/cookieSettings';
import { useCookies } from 'react-cookie';
import { languageDuck, Locale } from 'store/reducers/language-duck';
import { hentVarsler } from 'store/reducers/varselinnboks-duck';
import { hentInnloggingsstatus } from 'store/reducers/innloggingsstatus-duck';
import { fetchDriftsmeldinger } from 'store/reducers/driftsmeldinger-duck';
import { fetchFeatureToggles, Status } from 'api/api';
import { ActionType } from 'store/actions';
import { loadExternalScript } from 'utils/external-scripts';
import { BrowserSupportMsg } from 'komponenter/header/header-regular/common/browser-support-msg/BrowserSupportMsg';
import { getLoginUrl } from 'utils/login';
import Driftsmeldinger from './common/driftsmeldinger/Driftsmeldinger';
import Brodsmulesti from './common/brodsmulesti/Brodsmulesti';
import { msgSafetyCheck, postMessageToApp } from 'utils/messages';
import { SprakVelger } from './common/sprakvelger/SprakVelger';
import {
    validateAvailableLanguages,
    validateUtilsBackground,
    validateLogoutUrl,
    validateBreadcrumbs,
    validateContext,
    validateLanguage,
    validateLevel,
    validateRedirectUrl,
} from '../../server/utils';
import { setParams } from 'store/reducers/environment-duck';
import { getUrlFromLookupTable } from '@navikt/nav-dekoratoren-moduler';
import cls from 'classnames';
import Skiplinks from 'komponenter/header/common/skiplinks/Skiplinks';
import { useOnPushStateHandlers } from '../../utils/hooks/useOnPushStateHandlers';
import { GodJul } from './common/godjul/GodJul';

import './Header.scss';

export const decoratorContextCookie = CookieName.DECORATOR_CONTEXT;
export const decoratorLanguageCookie = CookieName.DECORATOR_LANGUAGE;

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
    const { PARAMS, APP_URL, API_DEKORATOREN_URL, ENV } = environment;
    const currentFeatureToggles = useSelector(stateSelector).featureToggles;
    const breadcrumbs = PARAMS.BREADCRUMBS || [];
    const availableLanguages = PARAMS.AVAILABLE_LANGUAGES || [];
    const useSimpleHeader = PARAMS.SIMPLE || PARAMS.SIMPLE_HEADER;

    const [cookies, setCookie] = useCookies();

    useOnPushStateHandlers(PARAMS, innloggingsstatus);

    // Map prod to dev urls with url-lookup-table
    const setUrlLookupTableUrls = () => {
        const anchors = Array.prototype.slice.call(document.getElementsByTagName('a'));
        anchors.forEach((anchor) => {
            const envUrl = getUrlFromLookupTable(anchor.href, ENV as 'dev');
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

    // Handle feature toggles
    useEffect(() => {
        if (currentFeatureToggles['dekoratoren.skjermdeling']) {
            loadExternalScript('https://account.psplugin.com/83BD7664-B38B-4EEE-8D99-200669A32551/ps.js');
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
        hentInnloggingsstatus(API_DEKORATOREN_URL)(dispatch);
        fetchMenypunkter(APP_URL)(dispatch);
        if (Object.keys(currentFeatureToggles).length) {
            fetchFeatureToggles(API_DEKORATOREN_URL, currentFeatureToggles)
                .then((updatedFeatureToggles) => {
                    dispatch({
                        type: ActionType.SETT_FEATURE_TOGGLES,
                        data: updatedFeatureToggles,
                    });
                })
                .catch((error) => {
                    console.error(`Failed to fetch feature-toggles: ${error}`);
                });
        }
        loadExternalScript(
            ENV === 'prod'
                ? 'https://nav.boost.ai/chatPanel/chatPanel.js'
                : 'https://navtest.boost.ai/chatPanel/chatPanel.js'
        );
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
            hentVarsler(API_DEKORATOREN_URL)(dispatch);
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
                    const {
                        simple,
                        simpleHeader,
                        simpleFooter,
                        context,
                        level,
                        language,
                        availableLanguages: languagesFromPayload,
                        breadcrumbs: breadcrumbsFromPayload,
                        enforceLogin,
                        redirectToApp,
                        redirectToUrl,
                        feedback,
                        chatbot,
                        chatbotVisible,
                        shareScreen,
                        utilsBackground,
                        logoutUrl,
                    } = payload;

                    if (logoutUrl) {
                        validateLogoutUrl(logoutUrl);
                    }
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
                    if (languagesFromPayload) {
                        validateAvailableLanguages(languagesFromPayload);
                    }
                    if (breadcrumbsFromPayload) {
                        validateBreadcrumbs(breadcrumbsFromPayload);
                    }
                    if (utilsBackground) {
                        validateUtilsBackground(utilsBackground);
                    }
                    if (redirectToUrl) {
                        validateRedirectUrl(redirectToUrl);
                    }
                    const params = {
                        ...(context && {
                            CONTEXT: context,
                        }),
                        ...(simple !== undefined && {
                            SIMPLE: simple === true,
                        }),
                        ...(simpleHeader !== undefined && {
                            SIMPLE_HEADER: simpleHeader === true,
                        }),
                        ...(simpleFooter !== undefined && {
                            SIMPLE_FOOTER: simpleFooter === true,
                        }),
                        ...(enforceLogin !== undefined && {
                            ENFORCE_LOGIN: enforceLogin === true,
                        }),
                        ...(redirectToApp !== undefined && {
                            REDIRECT_TO_APP: redirectToApp === true,
                        }),
                        ...(redirectToUrl !== undefined && {
                            REDIRECT_TO_URL: redirectToUrl,
                        }),
                        ...(level && {
                            LEVEL: level,
                        }),
                        ...(language && {
                            LANGUAGE: language,
                        }),
                        ...(languagesFromPayload && {
                            AVAILABLE_LANGUAGES: languagesFromPayload,
                        }),
                        ...(breadcrumbsFromPayload && {
                            BREADCRUMBS: breadcrumbsFromPayload,
                        }),
                        ...(feedback !== undefined && {
                            FEEDBACK: feedback === true,
                        }),
                        ...(chatbot !== undefined && {
                            CHATBOT: chatbot === true,
                        }),
                        ...(chatbotVisible !== undefined && {
                            CHATBOT_VISIBLE: chatbotVisible === true,
                        }),
                        ...(utilsBackground && {
                            UTILS_BACKGROUND: utilsBackground,
                        }),
                        ...(shareScreen !== undefined && {
                            SHARE_SCREEN: shareScreen === true,
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
            <span id={'top-element'} tabIndex={-1} />
            <GodJul />
            <BrowserSupportMsg />
            <header className={`siteheader${useSimpleHeader ? ' simple' : ''}`}>
                <Skiplinks simple={useSimpleHeader} />
                {useSimpleHeader ? <HeaderSimple /> : <HeaderRegular />}
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
