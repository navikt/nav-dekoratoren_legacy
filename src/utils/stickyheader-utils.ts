import debounce from 'lodash.debounce';
import { desktopBreakpoint } from 'komponenter/header/Header';
import { Language } from 'store/reducers/language-duck';

interface Windowview {
    windowHeight: number;
    navbarHeight: number;
    topheaderHeight: number;
    desktop: boolean;
    language: Language;
}

export const current: Windowview = {
    windowHeight: 0,
    navbarHeight: 0,
    topheaderHeight: 0,
    desktop: true,
    language: Language.IKKEBESTEMT,
};

const setElementStyleTop = (element: HTMLElement, distance: number): void => {
    element.style.top = `${distance}px`;
};

const transformNodeList = (menuHeight: number): void => {
    const nodeList = document.getElementsByClassName('mobilmeny__menuheight');
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

const setTopHeaderOffsetHeight = (
    mainmenuHeight: number,
    arbeidsflateHeight: number,
    selectorFoundArbeidsflate: boolean
) => {
    selectorFoundArbeidsflate
        ? (current.topheaderHeight =
              current.language === Language.NORSK ||
              current.language === Language.IKKEBESTEMT
                  ? arbeidsflateHeight
                  : 0)
        : (current.topheaderHeight =
              current.language !== Language.NORSK ? 0 : arbeidsflateHeight);
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

export const initializeSticky = (
    mainmenu: HTMLElement,
    arbeidsflate: HTMLElement | null,
    language: Language
): void => {
    const arbeidsflateHeight = arbeidsflate ? arbeidsflate.offsetHeight : 44;
    current.language = language;
    setTopHeaderOffsetHeight(
        mainmenu.offsetHeight,
        arbeidsflateHeight,
        !!arbeidsflate
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
            current.navbarHeight + (current.windowHeight - window.pageYOffset);
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
            current.navbarHeight - (window.pageYOffset - current.windowHeight);

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

export const positionNavbar = (mainmenu: HTMLElement): void => {
    scrollActionUp() ? handleScrollup(mainmenu) : handleScrollDown(mainmenu);
    current.windowHeight = window.pageYOffset;
};

export const changeBetweenDesktopAndMobilView = () => {
    return (
        (current.desktop && window.innerWidth < desktopBreakpoint) ||
        (!current.desktop && window.innerWidth >= desktopBreakpoint)
    );
};
