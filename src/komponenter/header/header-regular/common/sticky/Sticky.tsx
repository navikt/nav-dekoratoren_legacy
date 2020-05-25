import React, { useEffect, useRef } from 'react';
import './Sticky.less';

const setTop = (element: HTMLElement, top: number) =>
    (element.style.top = `${top}px`);

const onScroll = (
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

export const Sticky = ({
    fixed = false,
    children,
}: {
    fixed?: boolean;
    children: JSX.Element;
}) => {
    const prevScrollOffset = useRef(0);
    const baseOffset = useRef(0);

    const placeholderRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const stickyElement = stickyRef.current;
        if (stickyElement) {
            prevScrollOffset.current = window.pageYOffset;
            stickyElement.style.position = 'absolute';
        }
    }, []);

    useEffect(() => {
        const placeholderElement = placeholderRef.current;
        const stickyElement = stickyRef.current;
        if (!placeholderElement || !stickyElement) {
            return;
        }
        if (fixed && stickyElement) {
            stickyElement.style.position = 'fixed';
            setTop(stickyElement, 0);
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
        resizeHandler();

        window.addEventListener('scroll', scrollHandler);
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('scroll', scrollHandler);
            window.removeEventListener('resize', resizeHandler);
        };
    }, [fixed]);

    return (
        <div className={'sticky-placeholder'} ref={placeholderRef}>
            <div className={'sticky-container'} ref={stickyRef}>
                {children}
            </div>
        </div>
    );
};
