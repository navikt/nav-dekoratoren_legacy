import React, { useEffect, useRef } from 'react';
import './Sticky.less';

type Props = {
    id: string;
    children: JSX.Element;
};

const onScroll = (
    prevScrollOffset: React.MutableRefObject<number>,
    minOffset: number,
    element: HTMLElement
) => () => {
    const scrollOffset = window.pageYOffset;
    const elementOffset = element.offsetTop;
    const scrollDelta = scrollOffset - prevScrollOffset.current;

    const setTop = (top: number) => (element.style.top = `${top}px`);

    const onScrollDown = () => {
        if (element.style.position !== 'absolute') {
            const absoluteOffset = scrollOffset + Math.min(elementOffset, 0);
            setTop(absoluteOffset);
            element.style.position = 'absolute';
        }
    };

    const onScrollUp = () => {
        if (element.style.position !== 'fixed') {
            const fixedOffset = Math.max(
                elementOffset - scrollOffset,
                scrollDelta - element.scrollHeight
            );
            setTop(Math.min(fixedOffset, 0));
            element.style.position = 'fixed';
        } else {
            setTop(Math.min(elementOffset - scrollDelta, 0));
        }
    };

    if (scrollOffset <= minOffset) {
        setTop(minOffset);
        element.style.position = 'absolute';
    } else {
        scrollDelta >= 0 ? onScrollDown() : onScrollUp();
    }

    prevScrollOffset.current = scrollOffset;
};

export const Sticky = ({ id, children }: Props) => {
    const prevScrollOffset = useRef(0);
    const placeholderId = `${id}-placeholder`;

    useEffect(() => {
        const element = document.getElementById(id);
        const placeholder = document.getElementById(placeholderId);
        if (!element || !placeholder) {
            return;
        }
        const scrollHandler = onScroll(
            prevScrollOffset,
            element.offsetTop,
            element
        );
        prevScrollOffset.current = window.pageYOffset;
        element.style.position = 'absolute';
        placeholder.style.height = `${element.scrollHeight}px`;
        scrollHandler();
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, []);

    return (
        <>
            <div className={'sticky-placeholder'} id={placeholderId} />
            <div className={'sticky-container'} id={id}>
                {children}
            </div>
        </>
    );
};
