import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenypunkter } from 'store/reducers/menu-duck';
import Skiplinks from './skiplinks/Skiplinks';
import MenyBakgrunn from './header-regular/meny/ekspanderende-menyer/meny-bakgrunn/MenyBakgrunn';
import { MenuValue } from 'utils/meny-storage-utils';
import { oppdaterSessionStorage } from 'utils/meny-storage-utils';
import { SimpleHeader } from './header-simple/HeaderSimple';
import { RegularHeader } from './header-regular/HeaderRegular';
import { AppState } from 'store/reducers';

export const Header = () => {
    const dispatch = useDispatch();
    const { PARAMS, APP_BASE_URL } = useSelector(
        (state: AppState) => state.environment
    );
    const [headeroffsetHeight, setHeaderoffsetHeight] = useState<
        number | undefined
    >(undefined);

    const setMinHeight = () => {
        const headwrapper = document.getElementById('head-wrapper');
        setHeaderoffsetHeight(headwrapper ? headwrapper.offsetHeight : 201);
    };

    useEffect(() => {
        fetchMenypunkter(APP_BASE_URL)(dispatch);
        if (PARAMS.CONTEXT !== MenuValue.IKKEVALGT) {
            oppdaterSessionStorage(PARAMS.CONTEXT);
        }
        setMinHeight();
        const header = document.getElementById('stickyhead');
        window.onscroll = function stickHeader() {
            setClassList(header);
        };
    }, []);

    const setClassList = (element: HTMLElement | null) => {
        if (element) {
            window.pageYOffset > element.offsetTop
                ? element.classList.add('sticky')
                : element.classList.remove('sticky');
        }
    };

    return (
        <Fragment>
            <div
                className="head-wrapper"
                style={{ minHeight: headeroffsetHeight }}
                id="head-wrapper"
            >
                <div className="head-container sticky" id="stickyhead">
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
                </div>
            </div>
        </Fragment>
    );
};

export default Header;
