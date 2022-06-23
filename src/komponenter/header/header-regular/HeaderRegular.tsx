import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { Sticky } from 'komponenter/header/header-regular/common/sticky/Sticky';
import MenyBakgrunn from 'komponenter/header/header-regular/common/bakgrunn/MenyBakgrunn';
import { HeaderMenylinje } from 'komponenter/header/header-regular/HeaderMenylinje';

export const HeaderRegular = () => {
    const mobilMenyIsOpen = useSelector(
        (state: AppState) => state.dropdownToggles.hovedmeny || state.dropdownToggles.varsler
    );

    useEffect(() => {
        mobilMenyIsOpen
            ? document.body.classList.add('no-scroll-mobil')
            : document.body.classList.remove('no-scroll-mobil');
    }, [mobilMenyIsOpen]);

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
