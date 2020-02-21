import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../reducer/reducer';
import { Language } from '../../reducer/language-duck';
import { fetchMenypunkter } from '../../reducer/menu-duck';
import Skiplinks from './skiplinks/Skiplinks';
import MobilMenylinje from './meny/MobilMenylinje';
import Arbeidsflatemeny from './arbeidsflatemeny/Arbeidsflatemeny';
import DesktopMenylinje from './meny/DesktopMenylinje';

export const Header = () => {
    const dispatch = useDispatch();
    const language = useSelector((state: AppState) => state.language.language);

    useEffect(() => {
        fetchMenypunkter()(dispatch);
    }, []);

    return (
        <>
            <Skiplinks />
            <header className="siteheader">
                <div className="media-sm-mobil mobil-meny">
                    <MobilMenylinje />
                </div>
                <div className="media-tablet-desktop tablet-desktop-meny">
                    {language === Language.NORSK && <Arbeidsflatemeny />}
                    <DesktopMenylinje language={language} />
                </div>
            </header>
        </>
    );
};

export default Header;
