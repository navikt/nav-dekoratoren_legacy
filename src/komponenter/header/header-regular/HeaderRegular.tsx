import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { Language } from 'store/reducers/language-duck';
import MobilMenylinje from './mobil/MobilMenylinje';
import Arbeidsflatemeny from './desktop/arbeidsflatemeny/Arbeidsflatemeny';
import DesktopMenylinje from './desktop/DesktopMenylinje';

export const RegularHeader = () => {
    const { COOKIES, PARAMS } = useSelector(
        (state: AppState) => state.environment
    );
    const language = useSelector((state: AppState) => state.language.language);

    const showContextMenu =
        PARAMS.LANGUAGE !== Language.IKKEBESTEMT
            ? PARAMS.LANGUAGE === Language.NORSK
            : COOKIES.LANGUAGE !== Language.IKKEBESTEMT
            ? COOKIES.LANGUAGE === Language.NORSK
            : PARAMS.LANGUAGE === Language.IKKEBESTEMT ||
              language === Language.NORSK;

    return (
        <Fragment>
            <div className="media-sm-mobil mobil-meny">
                <MobilMenylinje language={language} />
            </div>
            <div className="media-tablet-desktop tablet-desktop-meny">
                <div className="header-z-wrapper">
                    {showContextMenu ? <Arbeidsflatemeny /> : null}
                    <DesktopMenylinje />
                </div>
            </div>
        </Fragment>
    );
};
