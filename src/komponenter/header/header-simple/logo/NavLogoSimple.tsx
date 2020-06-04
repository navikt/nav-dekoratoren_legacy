import React from 'react';
import { GACategory } from 'utils/google-analytics';
import { LenkeMedGA } from 'komponenter/common/lenke-med-ga/LenkeMedGA';
import { getArbeidsflateContext } from 'komponenter/header/header-regular/common/arbeidsflate-lenker/arbeidsflate-lenker';
import { MenuValue } from 'utils/meny-storage-utils';
import { useDispatch, useSelector } from 'react-redux';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { cookieOptions } from 'store/reducers/arbeidsflate-duck';
import { erNavDekoratoren } from 'utils/Environment';
import { AppState } from 'store/reducers';
import { useCookies } from 'react-cookie';
import logo from 'ikoner/meny/NavLogoSvart.svg';

const NavLogoSimple = ({
    className,
    viewIndex,
}: {
    className?: string;
    viewIndex?: boolean;
}) => {
    const dispatch = useDispatch();
    const [, setCookie] = useCookies(['decorator-context']);
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const context = getArbeidsflateContext(XP_BASE_URL, MenuValue.PRIVATPERSON);
    const arbeidsflate = useSelector(
        (state: AppState) => state.arbeidsflate.status
    );

    return (
        <LenkeMedGA
            href={context.url}
            classNameOverride={`nav-brand-lenke ${className ? className : ``}`}
            tabIndex={viewIndex ? 0 : -1}
            onClick={(event) => {
                event.preventDefault();
                setCookie('decorator-context', context.key, cookieOptions);
                if (erNavDekoratoren()) {
                    dispatch(settArbeidsflate(context.key));
                } else {
                    window.location.href = context.url;
                }
            }}
            gaEventArgs={{
                context: arbeidsflate,
                category: GACategory.Meny,
                action: 'navlogo-mobilmeny',
            }}
        >
            <img src={logo} alt="Til forsiden" />
        </LenkeMedGA>
    );
};

export default NavLogoSimple;
