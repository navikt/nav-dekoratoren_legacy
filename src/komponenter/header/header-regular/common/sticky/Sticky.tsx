import React, { useEffect, useRef } from 'react';
import { stickyScrollHandler } from 'komponenter/header/header-regular/common/sticky/StickyUtils';
import { focusOverlapHandler } from 'komponenter/header/header-regular/common/sticky/StickyUtils';
import { deferStickyOnAnchorLinkHandler } from 'komponenter/header/header-regular/common/sticky/StickyUtils';
import style from './Sticky.module.scss';

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

        setStickyOffset();

        window.addEventListener('focusin', setFocusScrollOffset);
        window.addEventListener('scroll', setStickyOffset);
        window.addEventListener('resize', setStickyOffset);
        window.addEventListener('click', deferStickyOnAnchorLinkClick);
        return () => {
            window.removeEventListener('focusin', setFocusScrollOffset);
            window.removeEventListener('scroll', setStickyOffset);
            window.removeEventListener('resize', setStickyOffset);
            window.removeEventListener('click', deferStickyOnAnchorLinkClick);
        };
    }, []);

    return (
        <div className={style.stickyPlaceholder} ref={placeholderRef}>
            <div
                className={`${style.stickyContainer} ${mobileFixed ? style.stickyContainerMobilFixed : ''}`}
                ref={stickyRef}
            >
                {children}
            </div>
        </div>
    );
};
