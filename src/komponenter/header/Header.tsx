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
import debounce from 'lodash.debounce';

interface Windowview {
    windowHeight: number;
    navbarHeight: number;
    topheaderHeight: number;
    desktop: boolean;
}

export const desktopBreakpoint: number = 768;

export const Header = () => {
    const current: Windowview = {
        windowHeight: 0,
        navbarHeight: 0,
        topheaderHeight: 0,
        desktop: true,
    };

    const decoratorHeader = verifyWindowObj()
        ? document.getElementById('decorator-header')
        : null;
    let arbeidsflate: any = null;
    let hovedmeny: any = null;

    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(['decorator-context']);
    const language = useSelector((state: AppState) => state.language.language);
    const { PARAMS, APP_BASE_URL } = useSelector(
        (state: AppState) => state.environment
    );
    const [headeroffsetHeight, setHeaderoffsetHeight] = useState<
        number | undefined
    >();

    const getHovedmenyNode = () => {
        // bli igjen
        hovedmeny = verifyWindowObj()
            ? document.getElementById(
                  window.innerWidth > desktopBreakpoint
                      ? 'hovedmeny'
                      : 'mobilmeny'
              )
            : null;
    };

    const getArbeidsflatNode = () => {
        // bli igjen
        arbeidsflate = verifyWindowObj()
            ? document.getElementById('arbeidsflate')
            : null;
    };

    const setElementStyleTop = (
        element: HTMLElement,
        distance: number
    ): void => {
        element.style.top = `${distance}px`;
    };

    const transformNodeList = (menuHeight: number): void => {
        const nodeList = document.getElementsByClassName(
            'mobilmeny__menuheight'
        );
        if (nodeList) {
            Array.from(nodeList).forEach((element: any) => {
                element.style.top = `${menuHeight}px`;
                element.style.height = `calc(100% - ${menuHeight}px)`;
            });
        }
    };

    const throttleMenuPosition = (menuHeight: number) => {
        const throttleMobilmenyPlacement = debounce(
            () => transformNodeList(menuHeight),
            100
        );
        throttleMobilmenyPlacement();
    };

    const setMinHeightOnHeader = (
        decoratorHeader: HTMLElement,
        arbeidsflate: HTMLElement
    ) => {
        hovedmeny.style.position = 'static';
        setHeaderoffsetHeight(0);
        setHeaderoffsetHeight(
            language === Language.NORSK && current.desktop
                ? decoratorHeader.offsetHeight
                : decoratorHeader.offsetHeight - arbeidsflate.offsetHeight
        );
    };

    const setTopHeaderOffSetHeigh = (
        topheaderHeight: number,
        mainmenuHeight: number,
        arbeidsflateHeight: number
    ) => {
        current.topheaderHeight =
            language === Language.NORSK
                ? topheaderHeight - mainmenuHeight
                : topheaderHeight - arbeidsflateHeight - mainmenuHeight;
    };

    const setMenuStartPoint = (menu: HTMLElement) => {
        window.pageYOffset > current.topheaderHeight
            ? setElementStyleTop(menu, 0)
            : setElementStyleTop(
                  menu,
                  (current.navbarHeight =
                      current.topheaderHeight - window.pageYOffset)
              );
    };

    const initializeSticky = (
        mainmenu: HTMLElement,
        topheader: HTMLElement,
        arbeidsflate: HTMLElement
    ): void => {
        setTopHeaderOffSetHeigh(
            topheader.offsetHeight,
            mainmenu.offsetHeight,
            arbeidsflate.offsetHeight
        );
        setMenuStartPoint(mainmenu);

        current.windowHeight = window.pageYOffset;
        mainmenu.style.position = 'fixed';
        current.desktop = window.innerWidth > desktopBreakpoint;
        throttleMenuPosition(current.navbarHeight + mainmenu.offsetHeight);
    };

    const scrollActionUp = (): boolean => {
        return window.pageYOffset < current.windowHeight;
    };

    const handleScrollup = (menu: HTMLElement): void => {
        if (window.pageYOffset < current.topheaderHeight) {
            setElementStyleTop(
                menu,
                (current.navbarHeight =
                    current.topheaderHeight - window.pageYOffset)
            );
            if (!current.desktop) {
                throttleMenuPosition(current.navbarHeight + menu.offsetHeight);
            }
        }
        if (current.navbarHeight < 0) {
            const buffer =
                current.navbarHeight +
                (current.windowHeight - window.pageYOffset);
            buffer > 0
                ? setElementStyleTop(menu, (current.navbarHeight = 0))
                : setElementStyleTop(menu, (current.navbarHeight = buffer));
            if (!current.desktop) {
                throttleMenuPosition(current.navbarHeight + menu.offsetHeight);
            }
        }
    };

    const handleScrollDown = (menu: HTMLElement): void => {
        if (current.navbarHeight > menu.offsetHeight * -1) {
            const buffer =
                current.navbarHeight -
                (window.pageYOffset - current.windowHeight);

            buffer < menu.offsetHeight * -1
                ? setElementStyleTop(
                      menu,
                      (current.navbarHeight = menu.offsetHeight * -1)
                  )
                : setElementStyleTop(menu, (current.navbarHeight = buffer));
            if (!current.desktop) {
                throttleMenuPosition(current.navbarHeight + menu.offsetHeight);
            }
        }
    };

    const positionNavbar = (mainmenu: HTMLElement): void => {
        scrollActionUp()
            ? handleScrollup(mainmenu)
            : handleScrollDown(mainmenu);
        current.windowHeight = window.pageYOffset;
    };

    const changeBetweenDesktopAndMobilView = () => {
        return (
            (current.desktop && window.innerWidth < desktopBreakpoint) ||
            (!current.desktop && window.innerWidth >= desktopBreakpoint)
        );
    };

    const initStickySelectors = (): void => {
        // bli igjen
        if (changeBetweenDesktopAndMobilView()) {
            getHovedmenyNode();
            if (decoratorHeader && hovedmeny && arbeidsflate) {
                setMinHeightOnHeader(decoratorHeader, arbeidsflate);
                initializeSticky(hovedmeny, decoratorHeader, arbeidsflate);
            }
        }
    };

    useEffect(() => {
        // bli igjen
        getHovedmenyNode();
        getArbeidsflatNode();
        arbeidsflate = verifyWindowObj()
            ? document.getElementById('arbeidsflate')
            : null;

        if (hovedmeny && decoratorHeader && arbeidsflate) {
            setMinHeightOnHeader(decoratorHeader, arbeidsflate);
            window.onscroll = function stickyheader() {
                if (hovedmeny) {
                    positionNavbar(hovedmeny);
                }
            };
            initializeSticky(hovedmeny, decoratorHeader, arbeidsflate);
            window.addEventListener('resize', initStickySelectors);
            return () =>
                window.removeEventListener('resize', initStickySelectors);
        }
    }, [language]);

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
            if (context) {
                // Fetch state from cookie to prevent flickering
                dispatch(settArbeidsflate(context));
            } else {
                // Default to privatperson
                dispatch(settArbeidsflate(MenuValue.PRIVATPERSON));
                setCookie(
                    'decorator-context',
                    MenuValue.PRIVATPERSON,
                    cookieOptions
                );
            }
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
