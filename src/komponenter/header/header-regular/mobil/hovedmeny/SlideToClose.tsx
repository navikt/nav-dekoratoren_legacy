import React, { ReactNode, useState, TouchEvent } from 'react';
import { toggleHovedmeny } from 'store/reducers/dropdown-toggle-duck';
import { useDispatch } from 'react-redux';
import './SlideToClose.less';
import Tekst from '../../../../../tekster/finn-tekst';
import { Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from '../../../../../utils/bem';

interface Props {
    children: ReactNode;
    className?: string;
}

export const SlideToClose = ({ children, className }: Props) => {
    const [startX, setStartX] = useState(0);
    const cls = BEMHelper('slideToClose');
    const [dx, setDx] = useState(0);
    const dispatch = useDispatch();

    const styleContainer = dx ? { left: -dx, transition: 'none' } : undefined;
    const styleMessage = {
        left: screen.width - dx,
        display: dx ? 'flex' : 'none',
    };

    const onTouchMove = (event: TouchEvent<HTMLElement>) => {
        const newDx = startX - event.touches[0].clientX;
        if (dx === 0 && newDx >= 25 && newDx <= 100) {
            // Touch breakpoint
            setDx(newDx);
        } else if (dx !== 0 && newDx >= 0 && newDx <= 100) {
            // After touch start
            setDx(newDx);
        }
    };

    const onTouchStart = (event: TouchEvent<HTMLElement>) => {
        setStartX(event.touches[0].clientX);
    };

    const onTouchEnd = () => {
        if (dx > 75) {
            dispatch(toggleHovedmeny());
        }
        setDx(0);
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
