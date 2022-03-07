import React from 'react';
import Tekst from 'tekster/finn-tekst';
import BEMHelper from 'utils/bem';
import { Heading } from '@navikt/ds-react';
import KbNav, { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { AnalyticsCategory } from 'utils/analytics';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { getArbeidsflateContext } from 'komponenter/common/arbeidsflate-lenker/arbeidsflate-lenker';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { CookieName, cookieOptions } from '../../../../../../server/cookieSettings';
import { erNavDekoratoren } from 'utils/Environment';
import { useCookies } from 'react-cookie';
import './Toppseksjon.less';

interface Props {
    classname: string;
}

export const Toppseksjon = ({ classname }: Props) => {
    const cls = BEMHelper(classname);
    const dispatch = useDispatch();
    const [, setCookie] = useCookies([CookieName.DECORATOR_CONTEXT]);
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const arbeidsflate = useSelector((state: AppState) => state.arbeidsflate.status);
    const context = getArbeidsflateContext(XP_BASE_URL, arbeidsflate);

    return (
        <div className={cls.element('topp-seksjon')}>
            <Heading level="2" size="medium" className={cls.element('topp-seksjon-tittel')}>
                <Tekst id={`rolle-${arbeidsflate.toLowerCase()}`} />
                <span className={cls.element('topp-seksjon-tittel-decoration')} aria-hidden={true}>
                    {'//'}
                </span>
            </Heading>
            <LenkeMedSporing
                href={context.url}
                onClick={(event) => {
                    setCookie(CookieName.DECORATOR_CONTEXT, context.key, cookieOptions);
                    dispatch(settArbeidsflate(context.key));
                    if (erNavDekoratoren()) {
                        event.preventDefault();
                    }
                }}
                id={KbNav.getKbId(KbNavGroup.Hovedmeny, {
                    col: 0,
                    row: 0,
                    sub: 0,
                })}
                analyticsEventArgs={{
                    context: arbeidsflate,
                    category: AnalyticsCategory.Meny,
                    action: `hovedmeny/forsidelenke`,
                    label: XP_BASE_URL,
                }}
            >
                <Tekst id={'til-forsiden'} />
            </LenkeMedSporing>
        </div>
    );
};
