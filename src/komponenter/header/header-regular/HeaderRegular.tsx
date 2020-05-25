import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import MobilMenylinje from './mobil/MobilMenylinje';
import Arbeidsflatemeny from './desktop/arbeidsflatemeny/Arbeidsflatemeny';
import DesktopMenylinje from './desktop/DesktopMenylinje';
import { Language } from 'store/reducers/language-duck';
import { Sticky } from 'komponenter/header/header-regular/common/sticky/Sticky';

export const RegularHeader = () => {
    const language = useSelector((state: AppState) => state.language.language);
    const mobilMenyIsOpen = useSelector(
        (state: AppState) =>
            state.dropdownToggles.hovedmeny || state.dropdownToggles.varsler
    );

    return (
        <Fragment>
            <div className="media-sm-mobil">
                <Sticky fixed={mobilMenyIsOpen}>
                    <MobilMenylinje language={language} />
                </Sticky>
            </div>
            <div className="media-tablet-desktop">
                <div className="header-z-wrapper">
                    {language === Language.NORSK && <Arbeidsflatemeny />}
                    <Sticky>
                        <DesktopMenylinje />
                    </Sticky>
                </div>
            </div>
        </Fragment>
    );
};
