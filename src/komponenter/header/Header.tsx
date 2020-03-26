import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMenypunkter } from '../../reducer/menu-duck';
import Skiplinks from './skiplinks/Skiplinks';
import MenyBakgrunn from './meny/ekspanderende-menyer/meny-bakgrunn/MenyBakgrunn';
import {
    oppdaterSessionStorage,
    MenuValue,
} from '../../utils/meny-storage-utils';
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

    console.log(Environment.SIMPLE);

    return (
        <>
            <div className="header-z-wrapper">
                <Skiplinks />
            </div>
            <header className="siteheader">
                {Environment.SIMPLE ? <SimpleHeader /> : <RegularHeader />}
            </header>
            <MenyBakgrunn />
        </>
    );
};

export default Header;
