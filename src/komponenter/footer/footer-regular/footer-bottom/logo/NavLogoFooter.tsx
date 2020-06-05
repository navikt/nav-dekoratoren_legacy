import React from 'react';
import { GACategory } from 'utils/google-analytics';
import { LenkeMedGA } from 'komponenter/common/lenke-med-ga/LenkeMedGA';
import { getArbeidsflateContext } from 'komponenter/header/header-regular/common/arbeidsflate-lenker/arbeidsflate-lenker';
import { MenuValue } from 'utils/meny-storage-utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { cookieOptions } from 'store/reducers/arbeidsflate-duck';
import { erNavDekoratoren } from 'utils/Environment';
import { useCookies } from 'react-cookie';
import logo from 'ikoner/meny/NavLogoSvart.svg';
import './NavLogoFooter.less';

const NavLogoFooter = () => {
    const dispatch = useDispatch();
    const [, setCookie] = useCookies(['decorator-context']);
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const context = getArbeidsflateContext(XP_BASE_URL, MenuValue.PRIVATPERSON);
    const arbeidsflate = useSelector(
        (state: AppState) => state.arbeidsflate.status
    );

    return (
        <LenkeMedGA
            classNameOverride="navbar-brand"
            href={context.url}
            gaEventArgs={{
                context: arbeidsflate,
                category: GACategory.Footer,
                action: 'navlogo',
            }}
            onClick={(event) => {
                event.preventDefault();
                setCookie('decorator-context', context.key, cookieOptions);
                if (erNavDekoratoren()) {
                    dispatch(settArbeidsflate(context.key));
                } else {
                    window.location.href = context.url;
                }
            }}
        >
            <img src={logo} alt="Til forsiden" />
        </LenkeMedGA>
    );
};

export default NavLogoFooter;
