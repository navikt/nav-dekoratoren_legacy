import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenypunkter } from 'store/reducers/menu-duck';
import { MenuValue } from 'utils/meny-storage-utils';
import { HeaderSimple } from 'komponenter/header/header-simple/HeaderSimple';
import { HeaderRegular } from 'komponenter/header/header-regular/HeaderRegular';
import Driftsmeldinger from './driftsmeldinger/Driftsmeldinger';
import { AppState } from 'store/reducers';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { cookieOptions } from 'store/reducers/arbeidsflate-duck';
import { useCookies } from 'react-cookie';
import { Language, languageDuck } from 'store/reducers/language-duck';
import { HeadElements } from 'komponenter/common/HeadElements';
import { hentVarsler } from 'store/reducers/varselinnboks-duck';
import { hentInnloggingsstatus } from 'store/reducers/innloggingsstatus-duck';
import { fetchDriftsmeldinger } from 'store/reducers/driftsmeldinger-duck';
import { fetchFeatureToggles } from 'api/api';
import { ActionType } from 'store/actions';
import { loadVergic } from 'utils/scripts';
import { BrowserSupportMsg } from 'komponenter/header/header-regular/common/browser-support-msg/BrowserSupportMsg';

const unleashCacheCookie = 'decorator-unleash-cache';

export const Header = () => {
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies([
        'decorator-context',
        unleashCacheCookie,
    ]);
    const erInnlogget = useSelector(
        (state: AppState) => state.innloggingsstatus.data.authenticated
    );
    const currentFeatureToggles = useSelector(
        (state: AppState) => state.featureToggles
    );
    const { PARAMS, APP_URL, API_UNLEASH_PROXY_URL } = useSelector(
        (state: AppState) => state.environment
    );
    const defaultToPerson = () => {
        dispatch(settArbeidsflate(MenuValue.PRIVATPERSON));
        setCookie('decorator-context', MenuValue.PRIVATPERSON, cookieOptions);
    };

    // Handle feature toggles
    useEffect(() => {
        if (currentFeatureToggles['dekoratoren.skjermdeling']) {
            loadVergic();
        }
    }, [currentFeatureToggles]);

    // External data
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

    // Fetch notifications
    useEffect(() => {
        if (erInnlogget) {
            hentVarsler(APP_URL)(dispatch);
        }
    }, [erInnlogget]);

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
        <Fragment>
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
        </Fragment>
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
