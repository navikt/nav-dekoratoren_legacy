import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../reducer/reducer';
import { Language } from '../../reducer/language-duck';
import { fetchMenypunkter } from '../../reducer/menu-duck';
import Skiplinks from './skiplinks/Skiplinks';
import MobilMenylinje from './meny/MobilMenylinje';
import Arbeidsflatemeny from './arbeidsflatemeny/Arbeidsflatemeny';
import DesktopMenylinje from './meny/DesktopMenylinje';
import MenyBakgrunn from './meny/ekspanderende-menyer/meny-bakgrunn/MenyBakgrunn';
import {
    oppdaterSessionStorage,
    MenuValue,
} from '../../utils/meny-storage-utils';
import Environment from '../../utils/Environment';

export const Header = () => {
    const dispatch = useDispatch();
    const language = useSelector((state: AppState) => state.language.language);

    useEffect(() => {
        fetchMenypunkter()(dispatch);
        if (Environment.context !== MenuValue.IKKEVALGT) {
            oppdaterSessionStorage(Environment.context);
        }
    }, []);

    return (
        <>
            <Skiplinks />
            <header className="siteheader">
                <div className="media-sm-mobil mobil-meny">
                    <MobilMenylinje language={language} />
                </div>
                <div className="media-tablet-desktop tablet-desktop-meny">
                    <div className="header-z-wrapper">
                        {language === Language.NORSK && <Arbeidsflatemeny />}
                        <DesktopMenylinje language={language} />
                    </div>
                    <MenyBakgrunn className={'desktopmeny'} />
                </div>
            </header>
            <div className="media-sm-mobil mobil-meny">
                <MenyBakgrunn className={'mobilmeny'} />
            </div>
        </>
    );
};

export default Header;
