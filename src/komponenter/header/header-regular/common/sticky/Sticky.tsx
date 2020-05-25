import React, { useEffect, useRef } from 'react';
import './Sticky.less';

const onScroll = (
    prevScrollOffset: React.MutableRefObject<number>,
    baseOffset: React.MutableRefObject<number>,
    element: HTMLElement
) => () => {
    const elementHeight = element.offsetHeight;
    if (!elementHeight) {
        return;
    }

    const scrollOffset = window.pageYOffset;
    const elementOffset = element.offsetTop;
    const scrollChange = scrollOffset - prevScrollOffset.current;

    const setTop = (top: number) => (element.style.top = `${top}px`);

    const onScrollDown = () => {
        if (element.style.position !== 'absolute') {
            element.style.position = 'absolute';
            const absoluteOffsetFromFixed =
                scrollOffset + Math.min(elementOffset, 0) - baseOffset.current;
            setTop(absoluteOffsetFromFixed);
        }
    };

    const onScrollUp = () => {
        if (element.style.position === 'fixed') {
            setTop(Math.min(elementOffset - scrollChange, 0));
        } else {
            element.style.position = 'fixed';
            const fixedOffsetFromAbsolute = Math.max(
                elementOffset - scrollOffset + baseOffset.current,
                scrollChange - element.scrollHeight
            );
            setTop(Math.min(fixedOffsetFromAbsolute, 0));
        }
    };

    if (scrollOffset <= baseOffset.current) {
        element.style.position = 'absolute';
        setTop(0);
    } else {
        scrollChange >= 0 ? onScrollDown() : onScrollUp();
    }

    prevScrollOffset.current = scrollOffset;
};

export const Sticky = ({ children }: { children: JSX.Element }) => {
    const prevScrollOffset = useRef(0);
    const baseOffset = useRef(0);

    const placeholderRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const placeholderElement = placeholderRef.current;
        const stickyElement = stickyRef.current;
        if (!placeholderElement || !stickyElement) {
            return;
        }

        const scrollHandler = onScroll(
            prevScrollOffset,
            baseOffset,
            stickyElement
        );
        const resizeHandler = () => {
            placeholderElement.style.height = `${stickyElement.offsetHeight}px`;
            baseOffset.current = placeholderElement.offsetTop;
            scrollHandler();
        };

        prevScrollOffset.current = window.pageYOffset;
        stickyElement.style.position = 'absolute';
        resizeHandler();

        window.addEventListener('scroll', scrollHandler);
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('scroll', scrollHandler);
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    return (
        <div className={'sticky-placeholder'} ref={placeholderRef}>
            <div className={'sticky-container'} ref={stickyRef}>
                {children}
            </div>
        </div>
    );
};
