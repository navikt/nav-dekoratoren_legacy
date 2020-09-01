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
import { Language, languageDuck } from 'store/reducers/language-duck';
import { HeadElements } from 'komponenter/common/HeadElements';
import { hentVarsler } from 'store/reducers/varselinnboks-duck';
import { hentInnloggingsstatus } from 'store/reducers/innloggingsstatus-duck';
import { fetchDriftsmeldinger } from 'store/reducers/driftsmeldinger-duck';
import { fetchFeatureToggles, Status } from 'api/api';
import { ActionType } from 'store/actions';
import { loadVergic } from 'utils/external-scripts';
import { BrowserSupportMsg } from 'komponenter/header/header-regular/common/browser-support-msg/BrowserSupportMsg';
import { getLoginUrl } from 'utils/login';
import Driftsmeldinger from './driftsmeldinger/Driftsmeldinger';
import { postMessageToApp } from '../../utils/messages';

const unleashCacheCookie = 'decorator-unleash-cache';
const decoratorContextCookie = 'decorator-context';
const stateSelector = (state: AppState) => ({
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
    const { innloggingsstatus } = useSelector(stateSelector);
    const { authenticated } = innloggingsstatus.data;
    const { PARAMS, APP_URL, API_UNLEASH_PROXY_URL } = environment;
    const currentFeatureToggles = useSelector(stateSelector).featureToggles;
    const [cookies, setCookie] = useCookies([
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
        if (PARAMS.CONTEXT !== MenuValue.IKKEBESTEMT) {
            // Use params if defined
            dispatch(settArbeidsflate(PARAMS.CONTEXT));
            setCookie('decorator-context', PARAMS.CONTEXT, cookieOptions);
        } else {
            const context = cookies['decorator-context'];

            // Fetch state from cookie OR default to private-person
            context ? dispatch(settArbeidsflate(context)) : defaultToPerson();
        }
    }, []);

    // Context utils
    const defaultToPerson = () => {
        dispatch(settArbeidsflate(MenuValue.PRIVATPERSON));
        setCookie('decorator-context', MenuValue.PRIVATPERSON, cookieOptions);
    };

    // Fetch notifications
    useEffect(() => {
        if (authenticated) {
            hentVarsler(APP_URL)(dispatch);
        }
    }, [authenticated]);

    // Change language
    const checkUrlForLanguage = () => {
        if (PARAMS.LANGUAGE !== Language.IKKEBESTEMT) {
            dispatch(languageDuck.actionCreator({ language: PARAMS.LANGUAGE }));
            setCookie('decorator-language', PARAMS.LANGUAGE, cookieOptions);
        } else {
            // Fetch state from cookie OR default to norsk
            const language = getLanguageFromUrl();
            dispatch(languageDuck.actionCreator({ language }));
            setCookie('decorator-language', language, cookieOptions);
        }
    };

    useEffect(() => {
        window.addEventListener('popstate', checkUrlForLanguage);
        checkUrlForLanguage();
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
        </div>
    );
};

const getLanguageFromUrl = (): Language => {
    const locationPath = window.location.pathname;
    if (locationPath.includes('/en/')) {
        return Language.ENGELSK;
    } else if (locationPath.includes('/se/')) {
        return Language.SAMISK;
    }
    return Language.NORSK;
};

export default Header;
