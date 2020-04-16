import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { Language } from 'store/reducers/language-duck';
import MobilMenylinje from './meny/MobilMenylinje';
import Arbeidsflatemeny from './arbeidsflatemeny/Arbeidsflatemeny';
import DesktopMenylinje from './meny/DesktopMenylinje';
import { KbNavigationMain } from '../../../utils/keyboard-navigation/KbNavigationMain';

export const RegularHeader = () => {
    const language = useSelector((state: AppState) => state.language.language);
    return (
        <Fragment>
            <div className="media-sm-mobil mobil-meny">
                <MobilMenylinje language={language} />
            </div>
            <div className="media-tablet-desktop tablet-desktop-meny">
                <KbNavigationMain>
                    <div className="header-z-wrapper">
                        {language === Language.NORSK && <Arbeidsflatemeny />}
                        <DesktopMenylinje />
                    </div>
                </KbNavigationMain>
            </div>
        </Fragment>
    );
};
