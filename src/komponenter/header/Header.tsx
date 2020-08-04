import React, { Fragment, useEffect } from 'react';
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
import { fetchFeatureToggles } from '../../api/api';
import { ActionType } from '../../store/actions';

export const Header = () => {
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(['decorator-context']);
    const erInnlogget = useSelector(
        (state: AppState) => state.innloggingsstatus.data.authenticated
    );
    const featureToggles = useSelector(
        (state: AppState) => state.featureToggles
    );
    const { PARAMS, APP_BASE_URL, API_UNLEASH_PROXY_URL } = useSelector(
        (state: AppState) => state.environment
    );
    const defaultToPerson = () => {
        dispatch(settArbeidsflate(MenuValue.PRIVATPERSON));
        setCookie('decorator-context', MenuValue.PRIVATPERSON, cookieOptions);
    };

    console.log(featureToggles);
    // External data
    useEffect(() => {
        fetchMenypunkter(APP_BASE_URL)(dispatch);
        fetchFeatureToggles(API_UNLEASH_PROXY_URL, featureToggles).then(
            (featureToggles) =>
                dispatch({
                    type: ActionType.SETT_FEATURE_TOGGLES,
                    data: featureToggles,
                })
        );
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

    useEffect(() => {
        hentInnloggingsstatus(APP_BASE_URL)(dispatch);
    }, []);

    useEffect(() => {
        if (erInnlogget) {
            hentVarsler(APP_BASE_URL)(dispatch);
        }
    }, [erInnlogget]);

    return (
        <Fragment>
            <HeadElements />
            <span id={'top-element'} tabIndex={-1} />
            <header className="siteheader">
                {PARAMS.SIMPLE || PARAMS.SIMPLE_HEADER ? (
                    <HeaderSimple />
                ) : (
                    <HeaderRegular />
                )}
            </header>
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
