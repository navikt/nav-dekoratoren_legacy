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
    baseOffset: React.MutableRefObject<number>,
    element: HTMLElement
) => () => {
    if (!element.offsetHeight) {
        return;
    }

    const scrollOffset = window.pageYOffset;
    const elementOffset = element.offsetTop;
    const scrollChange = scrollOffset - prevScrollOffset.current;

    const onScrollDown = () => {
        if (element.style.position !== 'absolute') {
            element.style.position = 'absolute';
            const absoluteOffsetFromFixed =
                scrollOffset + Math.min(elementOffset, 0) - baseOffset.current;
            setTop(element, absoluteOffsetFromFixed);
        }
    };

    const onScrollUp = () => {
        if (element.style.position === 'fixed') {
            setTop(element, Math.min(elementOffset - scrollChange, 0));
        } else {
            element.style.position = 'fixed';
            const fixedOffsetFromAbsolute = Math.max(
                elementOffset - scrollOffset + baseOffset.current,
                scrollChange - element.scrollHeight
            );
            setTop(element, Math.min(fixedOffsetFromAbsolute, 0));
        }
    };

    if (scrollOffset <= baseOffset.current) {
        element.style.position = 'absolute';
        setTop(element, 0);
    } else {
        scrollChange >= 0 ? onScrollDown() : onScrollUp();
    }

    prevScrollOffset.current = scrollOffset;
};
