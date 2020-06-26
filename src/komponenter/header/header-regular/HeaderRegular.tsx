import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import Arbeidsflatemeny from './desktop/arbeidsflatemeny/Arbeidsflatemeny';
import { Language } from 'store/reducers/language-duck';
import { Sticky } from './common/sticky/Sticky';
import { useEffect } from 'react';
import Skiplinks from 'komponenter/header/header-regular/common/skiplinks/Skiplinks';
import MenyBakgrunn from 'komponenter/header/header-regular/common/bakgrunn/MenyBakgrunn';
import { HeaderMenylinje } from 'komponenter/header/header-regular/HeaderMenylinje';
import { SessionTimeoutMsg } from 'komponenter/header/header-regular/common/session-timeout-msg/SessionTimeoutMsg';

export const HeaderRegular = () => {
    const language = useSelector((state: AppState) => state.language.language);
    const mobilMenyIsOpen = useSelector(
        (state: AppState) =>
            state.dropdownToggles.hovedmeny || state.dropdownToggles.varsler
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
                {language === Language.NORSK && <Arbeidsflatemeny />}
                <Sticky mobilFixed={mobilMenyIsOpen}>
                    <HeaderMenylinje />
                </Sticky>
            </div>
            <MenyBakgrunn />
        </Fragment>
    );
};
