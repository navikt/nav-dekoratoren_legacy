import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenypunkter } from '../../reducer/menu-duck';
import Skiplinks from './skiplinks/Skiplinks';
import MenyBakgrunn from './header-regular/meny/ekspanderende-menyer/meny-bakgrunn/MenyBakgrunn';
import { MenuValue } from '../../utils/meny-storage-utils';
import { oppdaterSessionStorage } from '../../utils/meny-storage-utils';
import { SimpleHeader } from './header-simple/HeaderSimple';
import { RegularHeader } from './header-regular/HeaderRegular';
import { AppState } from '../../reducer/reducers';

export const Header = () => {
    const dispatch = useDispatch();
    const { PARAMS, APP_BASE_URL } = useSelector(
        (state: AppState) => state.environment
    );

    useEffect(() => {
        fetchMenypunkter(APP_BASE_URL)(dispatch);
        if (PARAMS.CONTEXT !== MenuValue.IKKEVALGT) {
            oppdaterSessionStorage(PARAMS.CONTEXT);
        }
    }, []);

    return (
        <Fragment>
            <div className="header-z-wrapper">
                <Skiplinks />
            </div>
            <header className="siteheader">
                {PARAMS.SIMPLE || PARAMS.SIMPLE_HEADER ? (
                    <SimpleHeader />
                ) : (
                    <RegularHeader />
                )}
            </header>
            <MenyBakgrunn />
        </Fragment>
    );
};

export default Header;
