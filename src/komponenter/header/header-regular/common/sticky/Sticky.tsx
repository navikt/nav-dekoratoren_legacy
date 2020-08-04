import React, { useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import { stickyScrollHandler } from 'komponenter/header/header-regular/common/sticky/StickyUtils';
import { setTop } from 'komponenter/header/header-regular/common/sticky/StickyUtils';
import { getLinkAnchorId } from 'komponenter/header/header-regular/common/sticky/StickyUtils';
import './Sticky.less';

type Props = {
    children: JSX.Element;
};

export const Sticky = ({ children }: Props) => {
    const prevScrollOffset = useRef(0);

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

        const setStickyOffset = stickyScrollHandler(
            prevScrollOffset,
            stickyElement,
            placeholderElement
        );

        const deferredScrollHandler = debounce(() => {
            window.removeEventListener('scroll', deferredScrollHandler);
            window.addEventListener('scroll', setStickyOffset);
        }, 100);

        const deferStickyOnAnchorLink = (e: MouseEvent) => {
            const anchorId = getLinkAnchorId(e.target as HTMLElement);
            if (!anchorId) {
                return;
            }

            stickyElement.style.position = 'absolute';
            prevScrollOffset.current = 0;
            setTop(stickyElement, 0);

            window.removeEventListener('scroll', setStickyOffset);
            window.addEventListener('scroll', deferredScrollHandler);
        };

        const setElementSizeAndBaseOffset = () => {
            placeholderElement.style.height = `${stickyElement.offsetHeight}px`;
            setStickyOffset();
        };

        setElementSizeAndBaseOffset();

        window.addEventListener('scroll', setStickyOffset);
        window.addEventListener('resize', setElementSizeAndBaseOffset);
        window.addEventListener('click', deferStickyOnAnchorLink);
        return () => {
            window.removeEventListener('scroll', setStickyOffset);
            window.removeEventListener('resize', setElementSizeAndBaseOffset);
            window.removeEventListener('click', deferStickyOnAnchorLink);
        };
    }, []);

    return (
        <div className={'sticky-placeholder'} ref={placeholderRef}>
            <div className={`sticky-container`} ref={stickyRef}>
                {children}
            </div>
        </div>
    );
};
