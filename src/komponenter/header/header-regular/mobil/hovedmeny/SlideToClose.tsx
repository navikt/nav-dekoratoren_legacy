import React, { ReactNode, useState, TouchEvent } from 'react';
import { toggleHovedmeny } from 'store/reducers/dropdown-toggle-duck';
import { useDispatch } from 'react-redux';

interface Props {
    children: ReactNode;
    className: string;
}

export const SlideToClose = ({ children, className }: Props) => {
    const [startX, setStartX] = useState(0);
    const dispatch = useDispatch();

    const onTouchStart = (event: TouchEvent<HTMLElement>) => {
        setStartX(event.touches[0].clientX);
    };

    const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
        const vx = startX - event.changedTouches[0].clientX;
        if (vx > 50) {
            dispatch(toggleHovedmeny());
        }
    };

    return (
        <section
            id={'slide-to-close'}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className={className}
        >
            {children}
        </section>
    );
};

export default SlideToClose;
