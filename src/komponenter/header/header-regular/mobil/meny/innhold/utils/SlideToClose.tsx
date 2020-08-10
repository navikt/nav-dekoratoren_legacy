import React, { ReactNode, useState, TouchEvent } from 'react';
import { useDispatch } from 'react-redux';
import Tekst from 'tekster/finn-tekst';
import { Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from 'utils/bem';
import { lukkAlleDropdowns } from 'store/reducers/dropdown-toggle-duck';
import './SlideToClose.less';

interface Props {
    children: ReactNode;
}

const slideMaxAngle = Math.PI / 6;
const slideMinDx = 25;
const slideMaxDx = 100;

export const SlideToClose = ({ children }: Props) => {
    const [isSliding, setIsSliding] = useState(false);
    const [disableSliding, setDisableSliding] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [dx, setDx] = useState(0);
    const [screenWidth, setScreenWidth] = useState(0);
    const dispatch = useDispatch();
    const cls = BEMHelper('slideToClose');

    const styleContainer = { left: -dx, transition: dx ? 'none' : undefined };
    const styleMessage = {
        left: screenWidth - dx,
        display: dx ? 'flex' : 'none',
    };

    const onTouchMove = (event: TouchEvent<HTMLElement>) => {
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
        const screenWidth = window.screen.width;
        if (screenWidth < 768) {
            setScreenWidth(screenWidth);
            setStartX(event.touches[0].clientX);
            setStartY(event.touches[0].clientY);
        } else {
            setDisableSliding(true);
        }
    };

    const onTouchEnd = () => {
        if (dx > 75) {
            dispatch(lukkAlleDropdowns());
            setTimeout(() => setDx(0), 400);
        } else {
            setDx(0);
        }
        setIsSliding(false);
        setDisableSliding(false);
    };

    return (
        <div className={cls.element('wrapper')}>
            <div
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={disableSliding ? undefined : onTouchEnd}
                style={styleContainer}
                className={cls.element('content')}
            >
                {children}
            </div>
            <div className={cls.element('message')} style={styleMessage}>
                <Normaltekst>
                    <Tekst id="lukk" />
                </Normaltekst>
            </div>
        </div>
    );
};

export default SlideToClose;
