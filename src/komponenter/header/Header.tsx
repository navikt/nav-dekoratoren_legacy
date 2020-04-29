import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenypunkter } from 'store/reducers/menu-duck';
import Skiplinks from './skiplinks/Skiplinks';
import MenyBakgrunn from './header-regular/meny/ekspanderende-menyer/meny-bakgrunn/MenyBakgrunn';
import { MenuValue } from 'utils/meny-storage-utils';
import { SimpleHeader } from './header-simple/HeaderSimple';
import { RegularHeader } from './header-regular/HeaderRegular';
import { AppState } from 'store/reducers';
import {
    cookieOptions,
    settArbeidsflate,
} from 'store/reducers/arbeidsflate-duck';
import { useCookies } from 'react-cookie';
import { Language, languageDuck } from 'store/reducers/language-duck';
import { verifyWindowObj } from 'utils/Environment';
import { HeadElements } from 'komponenter/HeadElements';
import {
    changeBetweenDesktopAndMobilView,
    current,
    initializeSticky,
    positionNavbar,
} from '../../utils/stickyheader-utils';

export const desktopBreakpoint: number = 768;

export const Header = () => {
    const decoratorHeader = verifyWindowObj()
        ? document.getElementById('decorator-header')
        : null;
    let arbeidsflate: any = null;
    let hovedmeny: any = null;

    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(['decorator-context']);
    const lang = useSelector((state: AppState) => state.language.language);
    const { PARAMS, APP_BASE_URL } = useSelector(
        (state: AppState) => state.environment
    );
    const [headeroffsetHeight, setHeaderoffsetHeight] = useState<
        number | undefined
    >();

    const getHovedmenyNode = () => {
        hovedmeny = verifyWindowObj()
            ? document.getElementById(
                  window.innerWidth > desktopBreakpoint
                      ? 'hovedmeny'
                      : 'mobilmeny'
              )
            : null;
    };

    const getArbeidsflatNode = () => {
        arbeidsflate = verifyWindowObj()
            ? document.getElementById('arbeidsflate')
            : null;
    };

    const setMinHeightOnHeader = (
        decorator: HTMLElement,
        arbeidsmeny: HTMLElement
    ) => {
        hovedmeny.style.position = 'static';
        setHeaderoffsetHeight(0);
        setHeaderoffsetHeight(
            lang === Language.NORSK && current.desktop
                ? decorator.offsetHeight
                : decorator.offsetHeight - arbeidsmeny.offsetHeight
        );
    };

    const initStickySelectors = (): void => {
        if (changeBetweenDesktopAndMobilView()) {
            getHovedmenyNode();
            if (decoratorHeader && hovedmeny && arbeidsflate) {
                setMinHeightOnHeader(decoratorHeader, arbeidsflate);

                initializeSticky(
                    hovedmeny,
                    decoratorHeader,
                    arbeidsflate,
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
        if (hovedmeny && decoratorHeader && arbeidsflate) {
            setMinHeightOnHeader(decoratorHeader, arbeidsflate);
            window.onscroll = function stickyheader() {
                if (hovedmeny) {
                    positionNavbar(hovedmeny);
                }
            };
            initializeSticky(hovedmeny, decoratorHeader, arbeidsflate, lang);
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
    useEffect(() => {
        const language = checkUrlForLanguage();
        const action = languageDuck.actionCreator({ language });
        setCookie('decorator-language', language, cookieOptions);
        dispatch(action);
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

const checkUrlForLanguage = (): Language => {
    const locationPath = window.location.pathname;
    if (locationPath.includes('/en/')) {
        return Language.ENGELSK;
    } else if (locationPath.includes('/se/')) {
        return Language.SAMISK;
    }
    return Language.NORSK;
};

export default Header;
