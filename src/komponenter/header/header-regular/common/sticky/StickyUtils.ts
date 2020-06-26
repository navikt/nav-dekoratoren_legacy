const getElementOffsetFromPageTop = (element: HTMLElement) => {
    return element?.getBoundingClientRect()?.top + window?.pageYOffset || 0;
};

export const setTop = (element: HTMLElement, top: number) =>
    (element.style.top = `${top}px`);

export const getLinkAnchorId = (element: HTMLElement | null): string | null => {
    if (!element) {
        return null;
    }
    if (element.tagName?.toLowerCase() === 'a') {
        return (element as HTMLAnchorElement).href.split('#')[1];
    }
    return getLinkAnchorId(element.parentElement);
};

export const stickyScrollHandler = (
    prevScrollOffset: React.MutableRefObject<number>,
    stickyElement: HTMLElement,
    placeholderElement: HTMLElement
) => () => {
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
            const absoluteOffsetFromFixed =
                scrollOffset + Math.min(elementOffset, 0) - baseOffset;
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
};
