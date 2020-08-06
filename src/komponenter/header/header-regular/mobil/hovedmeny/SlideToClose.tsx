import React, { ReactNode, useState, TouchEvent } from 'react';
import { toggleHovedmeny } from 'store/reducers/dropdown-toggle-duck';
import { useDispatch } from 'react-redux';

interface Props {
    children: ReactNode;
    className?: string;
}

export const SlideToClose = ({ children, className }: Props) => {
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [dx, setDx] = useState(0);
    const style = dx ? { left: -dx, transition: 'none' } : undefined;
    const dispatch = useDispatch();

    const onTouchMove = (event: TouchEvent<HTMLElement>) => {
        const dx = startX - event.touches[0].clientX;
        const dy = startY - event.touches[0].clientY;
        if (Math.abs(dy) > 20) {
            g;
            setDx(0);
        } else if (dx > 0) {
            setDx(dx);
        }
    };

    const onTouchStart = (event: TouchEvent<HTMLElement>) => {
        setStartX(event.touches[0].clientX);
        setStartY(event.touches[0].clientY);
    };

    const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
        setDx(0);
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
            className={className}
            style={style}
        >
            {children}
        </section>
    );
};

export default SlideToClose;
