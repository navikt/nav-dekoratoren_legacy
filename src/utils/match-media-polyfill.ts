import { verifyWindowObj } from './Environment';

const noMatchMediaSupportFallback = {
    addEventListener: (_: string, __: (e: any) => void) => null,
    removeEventListener: (_: string, __: (e: any) => void) => null,
};

export const matchMedia = (mediaQuery: string) => {
    if (!verifyWindowObj() || !window.matchMedia) {
        return noMatchMediaSupportFallback;
    }

    const mql = window.matchMedia(mediaQuery);

    if (!mql.addEventListener) {
        (mql as any).addEventListener = (_: string, callback: (e: MediaQueryListEvent) => void) =>
            mql.addListener(callback);
        (mql as any).removeEventListener = (_: string, callback: (e: MediaQueryListEvent) => void) =>
            mql.removeListener(callback);
        return mql;
    }

    return window.matchMedia(mediaQuery);
};
