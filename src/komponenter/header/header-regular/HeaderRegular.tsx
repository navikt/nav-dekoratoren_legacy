import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { Language } from 'store/reducers/language-duck';
import MobilMenylinje from './meny/MobilMenylinje';
import Arbeidsflatemeny from './arbeidsflatemeny/Arbeidsflatemeny';
import DesktopMenylinje from './meny/DesktopMenylinje';

export const RegularHeader = () => {
    const { COOKIES } = useSelector((state: AppState) => state.environment);
    const language = useSelector((state: AppState) => state.language.language);

    const showContextMenu =
        (language === Language.IKKEBESTEMT &&
            COOKIES.LANGUAGE === Language.NORSK) ||
        language === Language.NORSK;

    return (
        <Fragment>
            <div className="media-sm-mobil mobil-meny">
                <MobilMenylinje language={language} />
            </div>
            <div className="media-tablet-desktop tablet-desktop-meny">
                <div className="header-z-wrapper">
                    {showContextMenu && (
                        <Arbeidsflatemeny key={'arbeidsflatemeny'} />
                    )}
                    <DesktopMenylinje key={`header`} />
                </div>
            </div>
        </Fragment>
    );
};
