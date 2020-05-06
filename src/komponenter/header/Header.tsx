import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenypunkter } from 'store/reducers/menu-duck';
import Skiplinks from 'komponenter/header/skiplinks/Skiplinks';
import MenyBakgrunn from 'komponenter/header/header-regular/meny/ekspanderende-menyer/meny-bakgrunn/MenyBakgrunn';
import { MenuValue } from 'utils/meny-storage-utils';
import { SimpleHeader } from 'komponenter/header/header-simple/HeaderSimple';
import { RegularHeader } from 'komponenter/header/header-regular/HeaderRegular';
import { AppState } from 'store/reducers';
import {
    cookieOptions,
    settArbeidsflate,
} from 'store/reducers/arbeidsflate-duck';
import { useCookies } from 'react-cookie';
import { Language, languageDuck } from 'store/reducers/language-duck';
import { HeadElements } from 'komponenter/HeadElements';
import {
    changeBetweenDesktopAndMobilView,
    initializeSticky,
    positionNavbar,
} from 'utils/stickyheader-utils';
import { verifyWindowObj } from '../../utils/Environment';

export const desktopBreakpoint: number = 768;

export const Header = () => {
    let arbeidsflate: any = null;
    let hovedmeny: any = null;
    let headerInfoBanner: any = null;

    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(['decorator-context']);
    const lang = useSelector((state: AppState) => state.language.language);
    const { PARAMS, APP_BASE_URL } = useSelector(
        (state: AppState) => state.environment
    );
    const [headeroffsetHeight, setHeaderoffsetHeight] = useState<
        number | undefined
    >();

    const getHovedmenyNode = () =>
        (hovedmeny = document.getElementById(
            window.innerWidth > desktopBreakpoint ? 'hovedmeny' : 'mobilmeny'
        ));

    const getArbeidsflatNode = () =>
        (arbeidsflate = document.getElementById('arbeidsflate'));

    const getHeaderInfoBanner = () =>
        (headerInfoBanner = document.getElementById('dekorator-under-arbeid'));

    const setMinHeightOnHeader = (
        main: HTMLElement,
        arbeidsmeny: HTMLElement | null,
        headerInfo: HTMLElement
    ) => {
        const arbeidsflateHeight = arbeidsmeny ? arbeidsmeny.offsetHeight : 44;
        hovedmeny.style.position = 'static';
        setHeaderoffsetHeight(0);

        arbeidsmeny
            ? setHeaderoffsetHeight(
                  lang === Language.NORSK || lang === Language.IKKEBESTEMT
                      ? headerInfo.offsetHeight +
                            arbeidsflateHeight +
                            main.offsetHeight
                      : headerInfo.offsetHeight + main.offsetHeight
              )
            : setHeaderoffsetHeight(
                  lang !== Language.NORSK
                      ? headerInfo.offsetHeight + main.offsetHeight
                      : headerInfo.offsetHeight +
                            arbeidsflateHeight +
                            main.offsetHeight
              );
    };

    const initStickySelectors = (): void => {
        if (changeBetweenDesktopAndMobilView()) {
            getHovedmenyNode();
            if (hovedmeny && headerInfoBanner) {
                setMinHeightOnHeader(hovedmeny, arbeidsflate, headerInfoBanner);

                initializeSticky(
                    hovedmeny,
                    arbeidsflate,
                    headerInfoBanner,
                    lang
                );
            }
        }
    };

    const defaultToPerson = () => {
        dispatch(settArbeidsflate(MenuValue.PRIVATPERSON));
        setCookie('decorator-context', MenuValue.PRIVATPERSON, cookieOptions);
    };

    useEffect(() => {
        getHovedmenyNode();
        getArbeidsflatNode();
        getHeaderInfoBanner();
        if (hovedmeny && headerInfoBanner) {
            setMinHeightOnHeader(hovedmeny, arbeidsflate, headerInfoBanner);
            window.onscroll = function stickyheader() {
                if (hovedmeny) {
                    positionNavbar(hovedmeny);
                }
            };
            initializeSticky(hovedmeny, arbeidsflate, headerInfoBanner, lang);
            window.addEventListener('resize', initStickySelectors);
            return () =>
                window.removeEventListener('resize', initStickySelectors);
        }
    }, [lang]);

    // External data
    useEffect(() => {
        fetchMenypunkter(APP_BASE_URL)(dispatch);
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
        const language = getLanguageFromUrl();
        const action = languageDuck.actionCreator({ language });
        setCookie('decorator-language', language, cookieOptions);
        dispatch(action);
    };

    useEffect(() => {
        window.addEventListener('popstate', checkUrlForLanguage);
        checkUrlForLanguage();
    }, []);

    return (
        <Fragment>
            <HeadElements />
            <div
                className="head-wrapper"
                style={{ minHeight: headeroffsetHeight }}
            >
                <div className="head-container " id="stickyhead">
                    <div className="header-z-wrapper">
                        <Skiplinks />
                    </div>
                    <header className="siteheader">
                        {PARAMS.SIMPLE || PARAMS.SIMPLE_HEADER ? (
                            <SimpleHeader />
                        ) : (
                            <RegularHeader />
                        )}
                    </header>
                    <MenyBakgrunn />
                </div>
            </div>
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
