import React from 'react';

const focusMarginPx = 4;

const getElementOffsetFromPageTop = (element: HTMLElement) => {
    return element?.getBoundingClientRect()?.top + window?.pageYOffset || 0;
};

const setTop = (element: HTMLElement, top: number) => (element.style.top = `${top}px`);

const getLinkAnchorId = (element: HTMLElement | null): string | null => {
    if (!element) {
        return null;
    }
    if (element.tagName?.toLowerCase() === 'a') {
        return (element as HTMLAnchorElement).href.split('#')[1];
    }
    return getLinkAnchorId(element.parentElement);
};

// Updates the sticky-header position
export const stickyScrollHandler =
    (prevScrollOffset: React.MutableRefObject<number>, stickyElement: HTMLElement, placeholderElement: HTMLElement) =>
    () => {
        if (!stickyElement.offsetHeight) {
            return;
        }

        const scrollOffset = window.pageYOffset;
        const elementOffset = stickyElement.offsetTop;
        const scrollChange = scrollOffset - prevScrollOffset.current;
        const baseOffset = getElementOffsetFromPageTop(placeholderElement);

        const onScrollDown = () => {
            if (stickyElement.style.position !== 'absolute') {
                stickyElement.style.position = 'absolute';
                const absoluteOffsetFromFixed = scrollOffset + Math.min(elementOffset, 0) - baseOffset;
                setTop(stickyElement, absoluteOffsetFromFixed);
            }
        };

        const onScrollUp = () => {
            if (stickyElement.style.position === 'fixed') {
                setTop(stickyElement, Math.min(elementOffset - scrollChange, 0));
            } else {
                stickyElement.style.position = 'fixed';
                const fixedOffsetFromAbsolute = Math.max(
                    elementOffset - scrollOffset + baseOffset,
                    scrollChange - stickyElement.scrollHeight
                );
                setTop(stickyElement, Math.min(fixedOffsetFromAbsolute, 0));
            }
        };

        if (scrollOffset <= baseOffset) {
            stickyElement.style.position = 'absolute';
            setTop(stickyElement, 0);
        } else {
            scrollChange >= 0 ? onScrollDown() : onScrollUp();
        }

        prevScrollOffset.current = scrollOffset;

        // Set offset variable for use in external applications
        setStickyOffsetVar();
    };

// Set the sticky-header to the top of the page, and defer updates to the sticky-position for
// up to one second. We want to minimize the chance of the header overlapping the anchor-link target
export const deferStickyOnAnchorLinkHandler =
    (prevScrollOffset: React.MutableRefObject<number>, stickyElement: HTMLElement, stickyScrollHandler: () => void) =>
    (e: MouseEvent) => {
        const anchorId = getLinkAnchorId(e.target as HTMLElement);
        if (!anchorId) {
            return;
        }

        const startTime = Date.now();
        const deferredScrollHandler = () => {
            const anchorElement = document.getElementById(anchorId);
            if (!anchorElement || anchorElement.getBoundingClientRect().top >= 0 || Date.now() - startTime > 1000) {
                setTimeout(() => {
                    window.removeEventListener('scroll', deferredScrollHandler);
                    window.addEventListener('scroll', stickyScrollHandler);
                }, 200);
            }
        };

        stickyElement.style.position = 'absolute';
        prevScrollOffset.current = 0;
        setTop(stickyElement, 0);

        window.removeEventListener('scroll', stickyScrollHandler);
        window.addEventListener('scroll', deferredScrollHandler);

        // Set offset variable for use in external applications
        setStickyOffsetVar();
    };

// If the element that will get focus may get overlapped by the sticky header, alter
// the header-position to prevent this from happening
export const focusOverlapHandler = (stickyElement: HTMLElement) => (e: FocusEvent) => {
    const eventPath = e.composedPath?.() || (e as any).path;

    // Skip this handler for elements focused inside the header, as the header can't overlap itself
    // (Also skip for browsers without composedPath/path support)
    if (!eventPath?.some || eventPath.some((path) => (path as HTMLElement)?.className?.includes('header-z-wrapper'))) {
        return;
    }

    const headerHeight = stickyElement?.getBoundingClientRect().height;
    const target = e.target as HTMLElement;
    const targetPos = target?.getBoundingClientRect && target.getBoundingClientRect().top;

    if (!headerHeight || targetPos === null || targetPos === undefined) {
        return;
    }

    const requiredScrollOffset = headerHeight - targetPos + focusMarginPx;

    if (requiredScrollOffset > 0) {
        stickyElement.style.position = 'absolute';
        setTop(stickyElement, 0);
    }

    // Set offset variable for use in external applications
    setStickyOffsetVar();
};

// Set offset variable for use in external applications
const setStickyOffsetVar = () => {
    const header = document.getElementById('hovedmeny');
    if (!header) {
        return;
    }

    const boundingRect = header.getBoundingClientRect();
    const offset = Math.max(boundingRect.top + boundingRect.height, 0);
    document.documentElement.style.setProperty('--decorator-sticky-offset', `${offset}px`);
};
