import React, { ReactNode, useState, TouchEvent } from 'react';
import { toggleHovedmeny } from 'store/reducers/dropdown-toggle-duck';
import { useDispatch } from 'react-redux';

interface Props {
    children: ReactNode;
    className?: string;
}

const slideTriggerRate = 2;
const slideTriggerDx = 25;

export const SlideToClose = ({ children, className }: Props) => {
    const [isSliding, setIsSliding] = useState(false);
    const [disableSliding, setDisableSliding] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [dx, setDx] = useState(0);
    const style = dx
        ? {
              left: -dx,
              transition: 'none',
          }
        : undefined;
    const dispatch = useDispatch();

    const onTouchMove = (event: TouchEvent<HTMLElement>) => {
        if (disableSliding) {
            return;
        }

        const dx = startX - event.touches[0].clientX;

        if (isSliding) {
            if (dx > 0) {
                setDx(dx);
            }
        } else {
            if (dx >= slideTriggerDx) {
                const dy = startY - event.touches[0].clientY;
                if (dx / Math.abs(dy) > slideTriggerRate) {
                    setIsSliding(true);
                } else {
                    setDisableSliding(true);
                }
            }
        }
    };

    const onTouchStart = (event: TouchEvent<HTMLElement>) => {
        setStartX(event.touches[0].clientX);
        setStartY(event.touches[0].clientY);
    };

    const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
        setDx(0);
        setIsSliding(false);
        setDisableSliding(false);
        if (dx > 50) {
            dispatch(toggleHovedmeny());
        }
    };

    return (
        <section
            id={'slide-to-close'}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onScroll={() => setDisableSliding(true)}
            className={className}
            style={style}
        >
            {children}
        </section>
    );
};

export default SlideToClose;
