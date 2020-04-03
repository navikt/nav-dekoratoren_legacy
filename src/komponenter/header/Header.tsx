import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenypunkter } from '../../reducer/menu-duck';
import Skiplinks from './skiplinks/Skiplinks';
import MenyBakgrunn from './meny/ekspanderende-menyer/meny-bakgrunn/MenyBakgrunn';
import { SimpleHeader } from './HeaderSimple';
import { RegularHeader } from './HeaderRegular';
import { AppState } from '../../reducer/reducers';
import {
    oppdaterSessionStorage,
    MenuValue,
} from '../../utils/meny-storage-utils';

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
