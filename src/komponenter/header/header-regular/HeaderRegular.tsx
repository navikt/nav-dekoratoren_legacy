import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import Arbeidsflatemeny from './desktop/arbeidsflatemeny/Arbeidsflatemeny';
import { Language } from 'store/reducers/language-duck';
import { useEffect } from 'react';
import Skiplinks from 'komponenter/header/skiplinks/Skiplinks';
import { CommonHeaderLinje } from 'komponenter/header/header-regular/CommonHeaderLinje';
import './HeaderRegular.less';

export const RegularHeader = () => {
    const language = useSelector((state: AppState) => state.language.language);
    const mobilMenyIsOpen = useSelector(
        (state: AppState) =>
            state.dropdownToggles.hovedmeny || state.dropdownToggles.varsler
    );

    useEffect(() => {
        mobilMenyIsOpen
            ? document.body.classList.add('no-scroll')
            : document.body.classList.remove('no-scroll');
    }, [mobilMenyIsOpen]);

    return (
        <Fragment>
            <Skiplinks />
            <div className="header-z-wrapper">
                {language === Language.NORSK && <Arbeidsflatemeny />}
                <CommonHeaderLinje />
            </div>
        </Fragment>
    );
};
