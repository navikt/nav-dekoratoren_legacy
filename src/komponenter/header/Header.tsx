import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenypunkter } from 'store/reducers/menu-duck';
import Skiplinks from './skiplinks/Skiplinks';
import MenyBakgrunn from './header-regular/meny/ekspanderende-menyer/meny-bakgrunn/MenyBakgrunn';
import { MenuValue } from 'utils/meny-storage-utils';
import { SimpleHeader } from './header-simple/HeaderSimple';
import { RegularHeader } from './header-regular/HeaderRegular';
import { AppState } from 'store/reducers';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { cookieOptions } from 'store/reducers/arbeidsflate-duck';
import { useCookies } from 'react-cookie';
import { Language, languageDuck } from '../../store/reducers/language-duck';

export const Header = () => {
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(['decorator-context']);
    const { PARAMS, APP_BASE_URL } = useSelector(
        (state: AppState) => state.environment
    );

    useEffect(() => {
        fetchMenypunkter(APP_BASE_URL)(dispatch);
    }, []);

    useEffect(() => {
        // Change context
        if (PARAMS.CONTEXT !== MenuValue.IKKEBESTEMT) {
            // Use params if defined
            dispatch(settArbeidsflate(PARAMS.CONTEXT));
            setCookie('decorator-context', PARAMS.CONTEXT, cookieOptions);
        } else {
            const context = cookies['decorator-context'];
            if (context) {
                // Fetch state from cookie to prevent flickering
                dispatch(settArbeidsflate(context));
            } else {
                // Default to privatperson
                dispatch(settArbeidsflate(MenuValue.PRIVATPERSON));
                setCookie('decorator-context', PARAMS.CONTEXT, cookieOptions);
            }
        }
    }, []);

    useEffect(() => {
        // Change language
        const language = checkUrlForLanguage();
        const action = languageDuck.actionCreator({ language });
        setCookie('decorator-language', language, cookieOptions);
        dispatch(action);
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

const checkUrlForLanguage = (): Language => {
    const locationPath = window.location.pathname;
    if (locationPath.includes('/en/')) {
        return Language.ENGELSK;
    } else if (locationPath.includes('/se/')) {
        return Language.SAMISK;
    }
    return Language.NORSK;
};

export default Header;
