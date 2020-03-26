import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { fetchMenypunkter } from '../../reducer/menu-duck';
import Skiplinks from './skiplinks/Skiplinks';
import MenyBakgrunn from './meny/ekspanderende-menyer/meny-bakgrunn/MenyBakgrunn';
import { MenuValue } from '../../utils/meny-storage-utils';
import { oppdaterSessionStorage } from '../../utils/meny-storage-utils';
import { SimpleHeader } from './HeaderSimple';
import { RegularHeader } from './HeaderRegular';
import { AppState } from '../../reducer/reducer';

export const Header = () => {
    const dispatch = useDispatch();
    const { PARAMS } = useSelector((state: AppState) => state.environment);

    useEffect(() => {
        fetchMenypunkter()(dispatch);
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
                {PARAMS.SIMPLE ? <SimpleHeader /> : <RegularHeader />}
            </header>
            <MenyBakgrunn />
        </Fragment>
    );
};

export default Header;
