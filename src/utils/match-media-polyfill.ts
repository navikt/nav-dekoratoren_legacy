import { verifyWindowObj } from './Environment';

const noMatchMediaSupportFallback = {
    addEventListener: (_: string, __: () => void) => null,
    removeEventListener: (_: string, __: () => void) => null,
};

export const matchMedia = (mediaQuery: string) => {
    // @ts-ignore
    if (!verifyWindowObj() || !window.matchMedia) {
        return noMatchMediaSupportFallback;
    }

    if (!MediaQueryList.prototype.addEventListener) {
        const mql = window.matchMedia(mediaQuery);
        // @ts-ignore
        mql.addEventListener = (_: string, callback: () => void) =>
            mql.addListener(callback);
        // @ts-ignore
        mql.removeEventListener = (_: string, callback: () => void) =>
            mql.removeListener(callback);
        return mql;
    }

    return window.matchMedia(mediaQuery);
};
