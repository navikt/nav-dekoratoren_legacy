import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import MobilMenylinje from './mobil/MobilMenylinje';
import Arbeidsflatemeny from './desktop/arbeidsflatemeny/Arbeidsflatemeny';
import DesktopMenylinje from './desktop/DesktopMenylinje';
import { showContextMenu } from 'utils/Environment';

export const RegularHeader = () => {
    const { COOKIES, PARAMS } = useSelector(
        (state: AppState) => state.environment
    );
    const language = useSelector((state: AppState) => state.language.language);

    const displayContextMenu = showContextMenu(
        PARAMS.LANGUAGE,
        COOKIES.LANGUAGE,
        language
    );

    return (
        <Fragment>
            <div className="media-sm-mobil mobil-meny">
                <MobilMenylinje language={language} />
            </div>
            <div className="media-tablet-desktop tablet-desktop-meny">
                <div className="header-z-wrapper">
                    {displayContextMenu && <Arbeidsflatemeny />}
                    <DesktopMenylinje />
                </div>
            </div>
        </Fragment>
    );
};
