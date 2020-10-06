import React from 'react';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { getArbeidsflateContext } from 'komponenter/common/arbeidsflate-lenker/arbeidsflate-lenker';
import { MenuValue } from 'utils/meny-storage-utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { erNavDekoratoren } from 'utils/Environment';
import { useCookies } from 'react-cookie';
import { AnalyticsEventArgs } from 'utils/analytics';
import { Bilde } from 'komponenter/common/bilde/Bilde';
import { setParams } from '../../../store/reducers/environment-duck';
import { cookieOptions } from '../../header/Header';
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
    const { language } = useSelector((state: AppState) => state.language);
    const context = getArbeidsflateContext(XP_BASE_URL, MenuValue.PRIVATPERSON);
    const urlMap: { [key: string]: string } = {
        nb: context.url,
        nn: context.url,
        en: `${XP_BASE_URL}/en/home`,
        se: `${XP_BASE_URL}/se/samegiella`,
    };

    const url = urlMap[language];
    return (
        <LenkeMedSporing
            classNameOverride={'nav-logo-lenke'}
            href={url}
            analyticsEventArgs={props.analyticsEventArgs}
            onClick={(event) => {
                setCookie('decorator-context', context.key, cookieOptions);
                dispatch(setParams({ CONTEXT: context.key }));
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
