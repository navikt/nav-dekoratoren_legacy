import React, { ReactNode, useState, TouchEvent } from 'react';
import { toggleHovedmeny } from 'store/reducers/dropdown-toggle-duck';
import { useDispatch } from 'react-redux';
import Tekst from 'tekster/finn-tekst';
import { Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from 'utils/bem';
import './SlideToClose.less';

interface Props {
    children: ReactNode;
    className?: string;
}

const slideMaxAngle = (25 / 180) * Math.PI;
const slideMinDx = 25;
const slideMaxDx = 100;

export const SlideToClose = ({ children, className }: Props) => {
    const [isSliding, setIsSliding] = useState(false);
    const [disableSliding, setDisableSliding] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const cls = BEMHelper('slideToClose');
    const [dx, setDx] = useState(0);
    const dispatch = useDispatch();

    const styleContainer = dx ? { left: -dx, transition: 'none' } : undefined;
    const styleMessage = {
        left: screen.width - dx,
        display: dx ? 'flex' : 'none',
    };

    const onTouchMove = (event: TouchEvent<HTMLElement>) => {
        if (disableSliding) {
            return;
        }

        const newDx = Math.max(
            Math.min(startX - event.touches[0].clientX, slideMaxDx),
            0
        );

        if (isSliding) {
            setDx(newDx);
        } else if (newDx >= slideMinDx) {
            const dy = startY - event.touches[0].clientY;
            if (Math.abs(Math.atan2(dy, newDx)) < slideMaxAngle) {
                setIsSliding(true);
                setDx(newDx);
            } else {
                setDisableSliding(true);
            }
        }
    };

    const onTouchStart = (event: TouchEvent<HTMLElement>) => {
        setStartX(event.touches[0].clientX);
        setStartY(event.touches[0].clientY);
    };

    const onTouchEnd = () => {
        if (dx > 75) {
            dispatch(toggleHovedmeny());
        }
        setDx(0);
        setIsSliding(false);
        setDisableSliding(false);
    };

    return (
        <div className={cls.element('wrapper')}>
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
            <div className={cls.element('message')} style={styleMessage}>
                <Normaltekst>
                    <Tekst id="lukk" />
                </Normaltekst>
            </div>
        </div>
    );
};

export default SlideToClose;
