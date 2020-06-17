import React, { useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import { stickyScrollHandler } from 'komponenter/header/header-regular/common/sticky/StickyUtils';
import { setTop } from 'komponenter/header/header-regular/common/sticky/StickyUtils';
import { getLinkAnchorId } from 'komponenter/header/header-regular/common/sticky/StickyUtils';
import './Sticky.less';

type Props = {
    alwaysSticky?: boolean;
    children: JSX.Element;
};

export const Sticky = ({ alwaysSticky = false, children }: Props) => {
    const prevScrollOffset = useRef(0);
    const baseOffset = useRef(0);

    const placeholderRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (stickyRef.current) {
            prevScrollOffset.current = window.pageYOffset;
            stickyRef.current.style.position = 'absolute';
        }
    }, []);

    useEffect(() => {
        const placeholderElement = placeholderRef.current;
        const stickyElement = stickyRef.current;
        if (!placeholderElement || !stickyElement) {
            return;
        }

        if (alwaysSticky) {
            stickyElement.style.position = 'fixed';
            setTop(stickyElement, 0);
            return;
        }

        const scrollHandler = stickyScrollHandler(
            prevScrollOffset,
            baseOffset,
            stickyElement
        );

        const deferredScrollHandler = debounce(() => {
            window.removeEventListener('scroll', deferredScrollHandler);
            window.addEventListener('scroll', scrollHandler);
        }, 100);

        const deferStickyOnAnchorLink = (e: MouseEvent) => {
            const anchorId = getLinkAnchorId(e.target as HTMLElement);
            if (!anchorId) {
                return;
            }

            stickyElement.style.position = 'absolute';
            prevScrollOffset.current = 0;
            setTop(stickyElement, 0);

            window.removeEventListener('scroll', scrollHandler);
            window.addEventListener('scroll', deferredScrollHandler);
        };

        const resizeHandler = () => {
            placeholderElement.style.height = `${stickyElement.offsetHeight}px`;
            baseOffset.current = placeholderElement.offsetTop;
            scrollHandler();
        };

        resizeHandler();

        window.addEventListener('scroll', scrollHandler);
        window.addEventListener('resize', resizeHandler);
        window.addEventListener('click', deferStickyOnAnchorLink);
        return () => {
            window.removeEventListener('scroll', scrollHandler);
            window.removeEventListener('resize', resizeHandler);
            window.removeEventListener('click', deferStickyOnAnchorLink);
        };
    }, [alwaysSticky]);

    return (
        <div className={'sticky-placeholder'} ref={placeholderRef}>
            <div className={'sticky-container'} ref={stickyRef}>
                {children}
            </div>
        </div>
    );
};
