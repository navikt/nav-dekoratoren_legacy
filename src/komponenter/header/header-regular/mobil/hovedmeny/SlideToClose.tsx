import React, { ReactNode, useState, TouchEvent } from 'react';
import { toggleHovedmeny } from 'store/reducers/dropdown-toggle-duck';
import { useDispatch } from 'react-redux';
import './SlideToClose.less';
import Tekst from '../../../../../tekster/finn-tekst';
import { Normaltekst } from 'nav-frontend-typografi';

interface Props {
    children: ReactNode;
    className?: string;
}

export const SlideToClose = ({ children, className }: Props) => {
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [dx, setDx] = useState(0);
    const dispatch = useDispatch();

    const styleContainer = dx ? { left: -dx, transition: 'none' } : undefined;
    const styleMessage = {
        left: screen.width - dx,
        display: dx ? 'flex' : 'none',
    };

    const onTouchMove = (event: TouchEvent<HTMLElement>) => {
        const newDx = startX - event.touches[0].clientX;
        const newDy = startY - event.touches[0].clientY;
        if (newDx > 25 && Math.abs(newDy) > 50) {
            // Reset if user slides vertically
            setDx(0);
        } else if (dx === 0 && newDx > 25 && newDy < 100) {
            // Touch breakpoint
            setDx(newDx);
        } else if (dx !== 0 && newDx > 0 && newDy < 100) {
            // After touch start
            setDx(newDx);
        }
    };

    const onTouchStart = (event: TouchEvent<HTMLElement>) => {
        setStartX(event.touches[0].clientX);
        setStartY(event.touches[0].clientY);
    };

    const onTouchEnd = () => {
        if (dx > 50) {
            dispatch(toggleHovedmeny());
        }
        setDx(0);
    };

    return (
        <div className={'slideToClose__wrapper'}>
            <section
                id={'slide-to-close'}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className={className}
                style={styleContainer}
            >
                {children}
            </section>
            <div className={'slideToClose__message'} style={styleMessage}>
                <Normaltekst>
                    <Tekst id="lukk" />
                </Normaltekst>
            </div>
        </div>
    );
};

export default SlideToClose;
