import { useState } from 'react';
import { verifyWindowObj } from './Environment';
import debounce from 'lodash.debounce';
import { desktopBreakpoint } from '../komponenter/header/Header';

interface Windowview {
    windowHeight: number;
    navbarHeight: number;
    topheaderHeight: number;
    desktop: boolean;
}

const current: Windowview = {
    windowHeight: 0,
    navbarHeight: 0,
    topheaderHeight: 0,
    desktop: true,
};

export const [headeroffsetHeight, setHeaderoffsetHeight] = useState<
    number | undefined
>();

const decoratorHeader = verifyWindowObj()
    ? document.getElementById('decorator-header')
    : null;

let hovedmeny: any = null;

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

const initializeStickyheader = (
    mainmenu: HTMLElement,
    topheader: HTMLElement
): void => {
    current.topheaderHeight = topheader.offsetHeight - mainmenu.offsetHeight;
    window.pageYOffset > current.topheaderHeight
        ? setElementStyleTop(mainmenu, 0)
        : setElementStyleTop(
              mainmenu,
              (current.navbarHeight =
                  current.topheaderHeight - window.pageYOffset)
          );

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

const positionNavbar = (mainmenu: HTMLElement): void => {
    scrollActionUp() ? handleScrollup(mainmenu) : handleScrollDown(mainmenu);
    current.windowHeight = window.pageYOffset;
};

const initStickySelectors = (): void => {
    if (
        (current.desktop && window.innerWidth < desktopBreakpoint) ||
        (!current.desktop && window.innerWidth >= desktopBreakpoint)
    ) {
        hovedmeny = verifyWindowObj()
            ? document.getElementById(
                  window.innerWidth > desktopBreakpoint
                      ? 'hovedmeny'
                      : 'mobilmeny'
              )
            : null;

        if (decoratorHeader && hovedmeny) {
            hovedmeny.style.position = 'static';
            setHeaderoffsetHeight(0);
            setHeaderoffsetHeight(decoratorHeader.offsetHeight);
            initializeStickyheader(hovedmeny, decoratorHeader);
        }
    }
};

const initializeSticky2 = () => {
    hovedmeny = verifyWindowObj()
        ? document.getElementById(
              window.innerWidth > desktopBreakpoint ? 'hovedmeny' : 'mobilmeny'
          )
        : null;
    if (hovedmeny && decoratorHeader) {
        setHeaderoffsetHeight(decoratorHeader.offsetHeight);
        window.onscroll = function stickyheader() {
            if (hovedmeny) {
                positionNavbar(hovedmeny);
            }
        };
        initializeStickyheader(hovedmeny, decoratorHeader);
        window.addEventListener('resize', initStickySelectors);
        return () => window.removeEventListener('resize', initStickySelectors);
    }
};
