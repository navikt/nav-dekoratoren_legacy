import React from 'react';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { getArbeidsflateContext } from 'komponenter/common/arbeidsflate-lenker/arbeidsflate-lenker';
import { MenuValue } from 'utils/meny-storage-utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { CookieName, cookieOptions } from '../../../server/cookieSettings';
import { erNavDekoratoren } from 'utils/Environment';
import { useCookies } from 'react-cookie';
import { AnalyticsEventArgs } from 'utils/analytics/analytics';
import { Bilde } from 'komponenter/common/bilde/Bilde';
import { getHomeUrl } from '../../../utils/home-url';
import './NavLogoLenke.less';

type Props = {
    analyticsEventArgs: AnalyticsEventArgs;
    id?: string;
    ikon: string;
};

export const NavLogoLenke = (props: Props) => {
    const dispatch = useDispatch();
    const [, setCookie] = useCookies([CookieName.DECORATOR_CONTEXT]);
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const { language } = useSelector((state: AppState) => state.language);
    const context = getArbeidsflateContext(XP_BASE_URL, MenuValue.PRIVATPERSON);

    const url = getHomeUrl(XP_BASE_URL, language);

    return (
        <LenkeMedSporing
            classNameOverride={'nav-logo-lenke'}
            href={url}
            analyticsEventArgs={props.analyticsEventArgs}
            onClick={(event) => {
                setCookie(CookieName.DECORATOR_CONTEXT, context.key, cookieOptions);
                dispatch(settArbeidsflate(context.key));
                if (erNavDekoratoren()) {
                    event.preventDefault();
                }
            }}
            id={props.id}
        >
            <Bilde altText="Til forsiden" asset={props.ikon} />
        </LenkeMedSporing>
    );
};

export default NavLogoLenke;
