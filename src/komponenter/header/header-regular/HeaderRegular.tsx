import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import MobilMenylinje from './mobil/MobilMenylinje';
import Arbeidsflatemeny from './desktop/arbeidsflatemeny/Arbeidsflatemeny';
import DesktopMenylinje from './desktop/DesktopMenylinje';
import { Language } from 'store/reducers/language-duck';

export const RegularHeader = () => {
    const language = useSelector((state: AppState) => state.language.language);

    return (
        <Fragment>
            <div className="media-sm-mobil mobil-meny">
                <MobilMenylinje language={language} />
            </div>
            <div className="media-tablet-desktop tablet-desktop-meny">
                <div className="header-z-wrapper">
                    {language === Language.NORSK && <Arbeidsflatemeny />}
                    <DesktopMenylinje />
                </div>
            </div>
        </Fragment>
    );
};
