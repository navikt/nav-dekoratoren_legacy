import React, { useEffect, useRef } from 'react';
import { stickyScrollHandler } from 'komponenter/header/header-regular/common/sticky/StickyUtils';
import { focusOverlapHandler } from 'komponenter/header/header-regular/common/sticky/StickyUtils';
import { deferStickyOnAnchorLinkHandler } from 'komponenter/header/header-regular/common/sticky/StickyUtils';
import './Sticky.less';

type Props = {
    mobileFixed?: boolean;
    children: JSX.Element;
};

export const Sticky = ({ mobileFixed, children }: Props) => {
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

        const setStickyOffset = stickyScrollHandler(prevScrollOffset, stickyElement, placeholderElement);
        const deferStickyOnAnchorLinkClick = deferStickyOnAnchorLinkHandler(
            prevScrollOffset,
            stickyElement,
            setStickyOffset
        );
        const setFocusScrollOffset = focusOverlapHandler(stickyElement);
        const setElementSizeAndBaseOffset = () => {
            placeholderElement.style.height = `${stickyElement.offsetHeight}px`;
            setStickyOffset();
        };

        setElementSizeAndBaseOffset();

        window.addEventListener('focusin', setFocusScrollOffset);
        window.addEventListener('scroll', setStickyOffset);
        window.addEventListener('resize', setElementSizeAndBaseOffset);
        window.addEventListener('click', deferStickyOnAnchorLinkClick);
        return () => {
            window.removeEventListener('focusin', setFocusScrollOffset);
            window.removeEventListener('scroll', setStickyOffset);
            window.removeEventListener('resize', setElementSizeAndBaseOffset);
            window.removeEventListener('click', deferStickyOnAnchorLinkClick);
        };
    }, []);

    return (
        <div className={'sticky-placeholder'} ref={placeholderRef}>
            <div className={`sticky-container ${mobileFixed ? 'sticky-container--mobil-fixed' : ''}`} ref={stickyRef}>
                {children}
            </div>
        </div>
    );
};
