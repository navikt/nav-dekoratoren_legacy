import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import Arbeidsflatemeny from './desktop/arbeidsflatemeny/Arbeidsflatemeny';
import { Locale } from 'store/reducers/language-duck';
import { Sticky } from 'komponenter/header/header-regular/common/sticky/Sticky';
import Skiplinks from 'komponenter/header/header-regular/common/skiplinks/Skiplinks';
import MenyBakgrunn from 'komponenter/header/header-regular/common/bakgrunn/MenyBakgrunn';
import { HeaderMenylinje } from 'komponenter/header/header-regular/HeaderMenylinje';

export const HeaderRegular = () => {
    const language = useSelector((state: AppState) => state.language.language);
    const isLanguageNorwegian = language === Locale.BOKMAL || language === Locale.NYNORSK;
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
            <Skiplinks />
            <div className="header-z-wrapper">
                {isLanguageNorwegian && <Arbeidsflatemeny />}
                <Sticky mobileFixed={mobilMenyIsOpen}>
                    <HeaderMenylinje />
                </Sticky>
            </div>
            <MenyBakgrunn />
        </Fragment>
    );
};
