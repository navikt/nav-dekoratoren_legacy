import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenypunkter } from 'store/reducers/menu-duck';
import { MenuValue } from 'utils/meny-storage-utils';
import { HeaderSimple } from 'komponenter/header/header-simple/HeaderSimple';
import { HeaderRegular } from 'komponenter/header/header-regular/HeaderRegular';
import { AppState } from 'store/reducers';
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
import { validateAvailableLanguages } from '../../server/utils';
import { validateBreadcrumbs } from '../../server/utils';
import { validateContext } from '../../server/utils';
import { validateLanguage, validateLevel } from '../../server/utils';
import { setParams } from 'store/reducers/environment-duck';
import './Header.less';

export const unleashCacheCookie = 'decorator-unleash-cache';
export const decoratorContextCookie = 'decorator-context';
export const decoratorLanguageCookie = 'decorator-language';

const stateSelector = (state: AppState) => ({
    innloggingsstatus: state.innloggingsstatus,
    language: state.language.language,
    featureToggles: state.featureToggles,
    environment: state.environment,
});

export const Header = () => {
    const dispatch = useDispatch();
    const [sentAuthToApp, setSentAuthToApp] = useState(false);
    const { environment } = useSelector(stateSelector);
    const { innloggingsstatus } = useSelector(stateSelector);
    const { authenticated } = innloggingsstatus.data;
    const { PARAMS, APP_URL, API_UNLEASH_PROXY_URL } = environment;
    const currentFeatureToggles = useSelector(stateSelector).featureToggles;
    const breadcrumbs = PARAMS.BREADCRUMBS || [];
    const availableLanguages = PARAMS.AVAILABLE_LANGUAGES || [];

    const [cookies, setCookie] = useCookies([
        decoratorLanguageCookie,
        decoratorContextCookie,
        unleashCacheCookie,
    ]);

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
            const insufficientPrivileges =
                PARAMS.LEVEL === 'Level4' && securityLevel === '3';

            if (!authenticated || insufficientPrivileges) {
                window.location.href = getLoginUrl(environment, PARAMS.CONTEXT);
            } else if (!sentAuthToApp) {
                postMessageToApp('auth', data);
                setSentAuthToApp(true);
            }
        }
    }, [PARAMS.ENFORCE_LOGIN, PARAMS.LEVEL, innloggingsstatus]);

    // Handle external data
    useEffect(() => {
        fetchDriftsmeldinger(APP_URL)(dispatch);
        hentInnloggingsstatus(APP_URL)(dispatch);
        fetchMenypunkter(APP_URL)(dispatch);
        if (Object.keys(currentFeatureToggles).length) {
            const togglesFromCookie = cookies[unleashCacheCookie];
            if (togglesFromCookie) {
                dispatch({
                    type: ActionType.SETT_FEATURE_TOGGLES,
                    data: togglesFromCookie,
                });
            } else {
                fetchFeatureToggles(
                    API_UNLEASH_PROXY_URL,
                    currentFeatureToggles
                )
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
                        console.error(
                            `Failed to fetch feature-toggles: ${error}`
                        );
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
            dispatch(setParams({ CONTEXT: fromParam }));
            setCookie(decoratorContextCookie, fromParam, cookieOptions);
        } else if (fromCookie) {
            dispatch(setParams({ CONTEXT: fromCookie }));
            setCookie(decoratorContextCookie, fromCookie, cookieOptions);
        } else {
            dispatch(setParams({ CONTEXT: fromDefault }));
            setCookie(decoratorContextCookie, fromDefault, cookieOptions);
        }
    }, []);

    // Fetch notifications
    useEffect(() => {
        if (authenticated) {
            hentVarsler(APP_URL)(dispatch);
        }
    }, [authenticated]);

    // Change language
    const setLanguage = () => {
        const fromParam = PARAMS.LANGUAGE;
        const fromUrl = getLanguageFromUrl();
        const fromCookie = cookies[decoratorLanguageCookie];
        const fromDefault = Locale.BOKMAL;
        console.log('Dekoratoren tmp debug: Set language');

        // Priority: Parameter -> url -> cookie -> default
        if (fromParam !== Locale.IKKEBESTEMT) {
            console.log('Dekoratoren tmp debug: Param');
            dispatch(languageDuck.actionCreator({ language: fromParam }));
            setCookie(decoratorLanguageCookie, fromParam, cookieOptions);
        } else if (fromUrl !== Locale.IKKEBESTEMT) {
            console.log('Dekoratoren tmp debug: URL');
            dispatch(languageDuck.actionCreator({ language: fromUrl }));
            setCookie(decoratorLanguageCookie, fromUrl, cookieOptions);
        } else if (fromCookie) {
            console.log('Dekoratoren tmp debug: Cookie');
            dispatch(languageDuck.actionCreator({ language: fromCookie }));
            setCookie(decoratorLanguageCookie, fromCookie, cookieOptions);
        } else {
            console.log('Dekoratoren tmp debug: Default');
            dispatch(languageDuck.actionCreator({ language: fromDefault }));
            setCookie(decoratorLanguageCookie, fromDefault, cookieOptions);
        }
    };

    useEffect(() => {
        window.addEventListener('popstate', setLanguage);
        setLanguage();
    }, []);

    // Send ready message to applications
    useEffect(() => {
        const receiveMessage = (msg: MessageEvent) => {
            const { data } = msg;
            const isSafe = msgSafetyCheck(msg);
            const { source, event } = data;
            if (isSafe) {
                if (source === 'decoratorClient' && event === 'ready') {
                    window.postMessage(
                        { source: 'decorator', event: 'ready' },
                        window.location.origin
                    );
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

                    if (context) {
                        validateContext(context);
                        setCookie(
                            decoratorContextCookie,
                            context,
                            cookieOptions
                        );
                    }

                    if (language) {
                        validateLanguage(language);
                        setCookie(
                            decoratorLanguageCookie,
                            language,
                            cookieOptions
                        );
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
                            FEEDBACK: feedback !== false,
                        }),
                        ...(chatbot !== undefined && {
                            CHATBOT: chatbot === true,
                        }),
                    };

                    console.log('Dekoratoren tmp debug: Set params');
                    console.log(params);
                    dispatch(setParams(params));
                }
            }
        };
        window.addEventListener('message', receiveMessage, false);
        return () => {
            window.removeEventListener('message', receiveMessage, false);
        };
    }, []);

    return (
        <div className={'decorator-wrapper'}>
            <HeadElements />
            <span id={'top-element'} tabIndex={-1} />
            <BrowserSupportMsg />
            <header className="siteheader">
                {PARAMS.SIMPLE || PARAMS.SIMPLE_HEADER ? (
                    <HeaderSimple />
                ) : (
                    <HeaderRegular />
                )}
            </header>
            <Driftsmeldinger />
            {(breadcrumbs.length > 0 || availableLanguages.length > 0) && (
                // Klassen "decorator-utils-container" brukes av appene til å sette bakgrunn
                <div className={'decorator-utils-container'}>
                    <div className={'decorator-utils-content'}>
                        {breadcrumbs.length > 0 && (
                            <Brodsmulesti breadcrumbs={breadcrumbs} />
                        )}
                        {availableLanguages.length > 0 && (
                            <SprakVelger languages={availableLanguages} />
                        )}
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

export const cookieOptions = {
    path: '/',
    domain: process.env.NODE_ENV === 'development' ? 'localhost' : '.nav.no',
};

export default Header;
