import { verifyWindowObj } from './Environment';

const noMatchMediaSupportFallback = {
    addEventListener: (_: string, __: (e: any) => void) => null,
    removeEventListener: (_: string, __: (e: any) => void) => null,
};

export const matchMediaPolyfill = (mediaQuery: string) => {
    // @ts-ignore
    if (!verifyWindowObj() || !window.matchMedia) {
        return noMatchMediaSupportFallback;
    }

    const mql = window.matchMedia(mediaQuery);

    if (!mql.addEventListener) {
        // @ts-ignore
        mql.addEventListener = (
            _: string,
            callback: (e: MediaQueryListEvent) => void
        ) => mql.addListener(callback);
        // @ts-ignore
        mql.removeEventListener = (
            _: string,
            callback: (e: MediaQueryListEvent) => void
        ) => mql.removeListener(callback);
        return mql;
    }

    return window.matchMedia(mediaQuery);
};
