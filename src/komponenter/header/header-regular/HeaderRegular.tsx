import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { Sticky } from 'komponenter/header/header-regular/common/sticky/Sticky';
import MenyBakgrunn from 'komponenter/header/header-regular/common/bakgrunn/MenyBakgrunn';
import { HeaderMenylinje } from 'komponenter/header/header-regular/HeaderMenylinje';
import { lukkAlleDropdowns } from '../../../store/reducers/dropdown-toggle-duck';

export const HeaderRegular = () => {
    const dispatch = useDispatch();

    const mobilMenyIsOpen = useSelector(
        (state: AppState) => state.dropdownToggles.hovedmeny || state.dropdownToggles.varsler
    );

    const menyIsOpen = useSelector(
        (state: AppState) =>
            state.dropdownToggles.varsler ||
            state.dropdownToggles.hovedmeny ||
            state.dropdownToggles.sok ||
            state.dropdownToggles.minside
    );

    useEffect(() => {
        mobilMenyIsOpen
            ? document.body.classList.add('no-scroll-mobil')
            : document.body.classList.remove('no-scroll-mobil');
    }, [mobilMenyIsOpen]);

    useEffect(() => {
        const focusHandler = () => {
            const currentFocus = document.activeElement;
            if (!currentFocus) {
                return;
            }

            const focusIsInHeader = !!currentFocus.closest('#decorator-header');
            if (!focusIsInHeader) {
                dispatch(lukkAlleDropdowns());
            }
        };

        if (menyIsOpen) {
            window.addEventListener('focusin', focusHandler);
        } else {
            window.removeEventListener('focusin', focusHandler);
        }

        return () => {
            window.removeEventListener('focusin', focusHandler);
        };
    }, [menyIsOpen, dispatch]);

    return (
        <Fragment>
            <div className="header-z-wrapper">
                <Sticky mobileFixed={mobilMenyIsOpen}>
                    <HeaderMenylinje />
                </Sticky>
            </div>
            <MenyBakgrunn />
        </Fragment>
    );
};
