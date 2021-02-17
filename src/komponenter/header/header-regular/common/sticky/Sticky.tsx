import React, { useEffect, useRef } from 'react';
import { stickyScrollHandler } from 'komponenter/header/header-regular/common/sticky/StickyUtils';
import { setTop } from 'komponenter/header/header-regular/common/sticky/StickyUtils';
import { getLinkAnchorId } from 'komponenter/header/header-regular/common/sticky/StickyUtils';
import './Sticky.less';

type Props = {
    mobilFixed?: boolean;
    children: JSX.Element;
};

export const Sticky = ({ mobilFixed, children }: Props) => {
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

        const deferStickyOnAnchorLink = (e: MouseEvent) => {
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
                        window.addEventListener('scroll', setStickyOffset);
                    }, 200);
                }
            };

            stickyElement.style.position = 'absolute';
            prevScrollOffset.current = 0;
            setTop(stickyElement, 0);

            window.removeEventListener('scroll', setStickyOffset);
            window.addEventListener('scroll', deferredScrollHandler);
        };

        // Scroll past the header height if the element that will get focus may get hidden
        // by the sticky header
        const onFocusChange = (e: FocusEvent) => {
            console.log('focus target:', e.target);
            console.log('focus position:', (e.target as HTMLElement).getBoundingClientRect().top);

            const headerHeight = stickyRef.current?.getBoundingClientRect().height;
            const targetPos = (e.target as HTMLElement)?.getBoundingClientRect().top;

            if (!headerHeight || !targetPos) {
                return;
            }

            const requiredFocucedElementOffset = headerHeight - targetPos + 4;

            if (requiredFocucedElementOffset > 0) {
                window.scrollTo(0, window.scrollY - requiredFocucedElementOffset);
            }
        };

        // Exclude the header from the previous handler
        const onFocusChangeHeader = (e: FocusEvent) => {
            e.stopPropagation();
        };

        const setElementSizeAndBaseOffset = () => {
            placeholderElement.style.height = `${stickyElement.offsetHeight}px`;
            setStickyOffset();
        };

        setElementSizeAndBaseOffset();

        const headerElement = document.getElementById('decorator-header');

        window.addEventListener('focusin', onFocusChange);
        headerElement?.addEventListener('focusin', onFocusChangeHeader, true);
        window.addEventListener('scroll', setStickyOffset);
        window.addEventListener('resize', setElementSizeAndBaseOffset);
        window.addEventListener('click', deferStickyOnAnchorLink);
        return () => {
            window.removeEventListener('focusin', onFocusChange);
            headerElement?.removeEventListener('focusin', onFocusChangeHeader, true);
            window.removeEventListener('scroll', setStickyOffset);
            window.removeEventListener('resize', setElementSizeAndBaseOffset);
            window.removeEventListener('click', deferStickyOnAnchorLink);
        };
    }, []);

    return (
        <div className={'sticky-placeholder'} ref={placeholderRef}>
            <div className={`sticky-container ${mobilFixed ? 'sticky-container--mobil-fixed' : ''}`} ref={stickyRef}>
                {children}
            </div>
        </div>
    );
};
