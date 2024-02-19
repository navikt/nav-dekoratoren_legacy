import React from 'react';
import Tekst from 'tekster/finn-tekst';
import { Heading } from '@navikt/ds-react';
import KbNav, { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { getArbeidsflateContext } from 'komponenter/common/arbeidsflate-lenker/arbeidsflate-lenker';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { CookieName, cookieOptions } from '../../../../../../server/cookieSettings';
import { erNavDekoratoren } from 'utils/Environment';
import { useCookies } from 'react-cookie';
import { MenuValue } from '../../../../../../utils/meny-storage-utils';

import style from './Toppseksjon.module.scss';
import { LangKey } from 'tekster/ledetekster';
import { Locale } from '../../../../../../store/reducers/language-duck';

export const Toppseksjon = () => {
    const dispatch = useDispatch();
    const [, setCookie] = useCookies([CookieName.DECORATOR_CONTEXT]);
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const arbeidsflate = useSelector((state: AppState) => state.arbeidsflate.status);
    const { language } = useSelector((state: AppState) => state.language);
    const context = getArbeidsflateContext(XP_BASE_URL, arbeidsflate, language);
    return (
        <div className={style.toppSeksjon} data-testid={'toppseksjon'}>
            <Heading level="2" size="medium" className={style.toppSeksjonTittel}>
                <Tekst
                    id={
                        arbeidsflate === MenuValue.PRIVATPERSON || language === Locale.ENGELSK
                            ? 'how-can-we-help'
                            : (`rolle-${arbeidsflate.toLowerCase()}` as LangKey)
                    }
                />
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
                className={style.forsideLenke}
            >
                <Tekst id={'til-forsiden'} />
            </LenkeMedSporing>
        </div>
    );
};
