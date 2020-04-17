import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenypunkter } from 'store/reducers/menu-duck';
import Skiplinks from './skiplinks/Skiplinks';
import MenyBakgrunn from './header-regular/meny/ekspanderende-menyer/meny-bakgrunn/MenyBakgrunn';
import { MenuValue } from 'utils/meny-storage-utils';
import { SimpleHeader } from './header-simple/HeaderSimple';
import { RegularHeader } from './header-regular/HeaderRegular';
import { AppState } from 'store/reducers';
import { settArbeidsflate } from '../../store/reducers/arbeidsflate-duck';
import { useCookies } from 'react-cookie';

export const Header = () => {
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(['decorator-context']);
    const { PARAMS, APP_BASE_URL } = useSelector(
        (state: AppState) => state.environment
    );

    useEffect(() => {
        fetchMenypunkter(APP_BASE_URL)(dispatch);
        if (PARAMS.CONTEXT !== MenuValue.IKKEVALGT) {
            setCookie('decorator-context', PARAMS.CONTEXT);
            dispatch(settArbeidsflate(PARAMS.CONTEXT));
        }
    }, []);

    useEffect(() => {
        const context = cookies['decorator-context'];
        if (context) {
            dispatch(settArbeidsflate(context));
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
