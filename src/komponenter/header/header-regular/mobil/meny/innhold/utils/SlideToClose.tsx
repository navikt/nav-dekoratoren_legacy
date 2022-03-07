import React, { ReactNode, useState, TouchEvent } from 'react';
import { BodyShort } from '@navikt/ds-react';
import { lukkAlleDropdowns } from 'store/reducers/dropdown-toggle-duck';
import { useDispatch } from 'react-redux';
import Tekst from 'tekster/finn-tekst';
import BEMHelper from 'utils/bem';
import './SlideToClose.less';

interface Props {
    children: ReactNode;
}

const slideMaxAngle = Math.PI / 6;
const slideMinDx = 25;
const slideMaxDx = 100;
const maxScreenWidth = 768;

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
        const newDx = Math.max(Math.min(startX - event.touches[0].clientX, slideMaxDx), 0);

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
        const width = window.screen.width;
        if (width < maxScreenWidth) {
            setScreenWidth(width);
            setStartX(event.touches[0].clientX);
            setStartY(event.touches[0].clientY);
        } else {
            setDisableSliding(true);
        }
    };

    const onTouchEnd = () => {
        if (dx > 75) {
            dispatch(lukkAlleDropdowns());
        }
        setDx(0);
        setIsSliding(false);
        setDisableSliding(false);
    };

    return (
        <>
            <div
                onTouchStart={onTouchStart}
                onTouchMove={disableSliding ? undefined : onTouchMove}
                onTouchEnd={onTouchEnd}
                style={styleContainer}
                className={cls.element('content')}
            >
                {children}
            </div>
            <div className={cls.element('message')} style={styleMessage}>
                <BodyShort>
                    <Tekst id="lukk" />
                </BodyShort>
            </div>
        </>
    );
};

export default SlideToClose;
