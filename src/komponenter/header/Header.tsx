import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderSimple } from 'komponenter/header/header-simple/HeaderSimple';
import { HeaderRegular } from 'komponenter/header/header-regular/HeaderRegular';
import { AppState } from 'store/reducers';
import { HeadElements } from 'komponenter/common/HeadElements';
import { hentVarsler } from 'store/reducers/varselinnboks-duck';

export const Header = () => {
    const dispatch = useDispatch();
    const erInnlogget = useSelector(
        (state: AppState) => state.innloggingsstatus.data.authenticated
    );
    const { PARAMS, APP_BASE_URL } = useSelector(
        (state: AppState) => state.environment
    );

    useEffect(() => {
        if (erInnlogget) {
            hentVarsler(APP_BASE_URL)(dispatch);
        }
    }, [erInnlogget]);

    return (
        <Fragment>
            <HeadElements />
            <span id={'top-element'} tabIndex={-1} />
            <header className="siteheader">
                {PARAMS.SIMPLE || PARAMS.SIMPLE_HEADER ? (
                    <HeaderSimple />
                ) : (
                    <HeaderRegular />
                )}
            </header>
        </Fragment>
    );
};

export default Header;
