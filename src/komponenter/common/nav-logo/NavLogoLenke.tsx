import React from 'react';
import { LenkeMedGA } from 'komponenter/common/lenke-med-ga/LenkeMedGA';
import { getArbeidsflateContext } from 'komponenter/common/arbeidsflate-lenker/arbeidsflate-lenker';
import { MenuValue } from 'utils/meny-storage-utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { cookieOptions } from 'store/reducers/arbeidsflate-duck';
import { erNavDekoratoren } from 'utils/Environment';
import { useCookies } from 'react-cookie';
import { GAEventArgs } from 'utils/google-analytics';
import './NavLogoLenke.less';

type Props = {
    gaEventArgs: GAEventArgs;
    id?: string;
    ikon: string;
};

export const NavLogoLenke = (props: Props) => {
    const dispatch = useDispatch();
    const [, setCookie] = useCookies(['decorator-context']);
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const context = getArbeidsflateContext(XP_BASE_URL, MenuValue.PRIVATPERSON);

    return (
        <LenkeMedGA
            classNameOverride={'nav-logo-lenke'}
            href={context.url}
            gaEventArgs={props.gaEventArgs}
            onClick={(event) => {
                event.preventDefault();
                setCookie('decorator-context', context.key, cookieOptions);
                if (erNavDekoratoren()) {
                    dispatch(settArbeidsflate(context.key));
                } else {
                    window.location.href = context.url;
                }
            }}
            id={props.id}
        >
            <img alt="Til forsiden" src={`${XP_BASE_URL}${props.ikon}`} />
        </LenkeMedGA>
    );
};

export default NavLogoLenke;
