import React, { useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMenypunkter } from '../../reducer/menu-duck';
import Skiplinks from './skiplinks/Skiplinks';
import MenyBakgrunn from './meny/ekspanderende-menyer/meny-bakgrunn/MenyBakgrunn';
import { MenuValue } from '../../utils/meny-storage-utils';
import { oppdaterSessionStorage } from '../../utils/meny-storage-utils';
import Environment from '../../utils/Environment';
import { SimpleHeader } from './HeaderSimple';
import { RegularHeader } from './HeaderRegular';

export const Header = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchMenypunkter()(dispatch);
        if (Environment.CONTEXT !== MenuValue.IKKEVALGT) {
            oppdaterSessionStorage(Environment.CONTEXT);
        }
    }, []);

    return (
        <Fragment>
            <div className="header-z-wrapper">
                <Skiplinks />
            </div>
            <header className="siteheader">
                {Environment.SIMPLE ? <SimpleHeader /> : <RegularHeader />}
            </header>
            <MenyBakgrunn />
        </Fragment>
    );
};

export default Header;
