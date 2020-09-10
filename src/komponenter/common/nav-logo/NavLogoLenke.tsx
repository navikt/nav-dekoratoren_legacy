import React from 'react';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { getArbeidsflateContext } from 'komponenter/common/arbeidsflate-lenker/arbeidsflate-lenker';
import { MenuValue } from 'utils/meny-storage-utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { cookieOptions } from 'store/reducers/arbeidsflate-duck';
import { erNavDekoratoren } from 'utils/Environment';
import { useCookies } from 'react-cookie';
import { AnalyticsEventArgs } from 'utils/analytics';
import { Bilde } from 'komponenter/common/bilde/Bilde';
import './NavLogoLenke.less';

type Props = {
    analyticsEventArgs: AnalyticsEventArgs;
    id?: string;
    ikon: string;
};

export const NavLogoLenke = (props: Props) => {
    const dispatch = useDispatch();
    const [, setCookie] = useCookies(['decorator-context']);
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const context = getArbeidsflateContext(XP_BASE_URL, MenuValue.PRIVATPERSON);

    return (
        <LenkeMedSporing
            classNameOverride={'nav-logo-lenke'}
            href={context.url}
            analyticsEventArgs={props.analyticsEventArgs}
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
            <Bilde altText="Til forsiden" asset={props.ikon} />
        </LenkeMedSporing>
    );
};

export default NavLogoLenke;
