// Disse to kan fjernes når TypeScript får støtte for ResizeObserver...
export type ResizeObserverEntry = {
    contentBoxSize: { inlineSize: number; blockSize: number };
    contentRect: { width: number; height: number };
};
export declare class ResizeObserver {
    constructor(callback: (entries: ResizeObserverEntry[]) => void);

    observe(element: HTMLElement): void;
    unobserve(element: HTMLElement): void;
}

const fallbackToResizeEvents = (callback: () => void) => ({
    observe: () => window.addEventListener('resize', callback),
    unobserve: () => window.removeEventListener('resize', callback),
});

export const getBodyResizeObserver = (callback: () => void) =>
    // @ts-ignore
    window.ResizeObserver
        ? new ResizeObserver((entries) => {
              entries.forEach(
                  (entry) =>
                      (entry?.contentRect || entry?.contentBoxSize) &&
                      callback()
              );
          })
        : fallbackToResizeEvents(callback);
