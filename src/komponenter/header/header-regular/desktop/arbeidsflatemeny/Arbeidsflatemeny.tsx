import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { Normaltekst } from 'nav-frontend-typografi';
import { arbeidsflateLenker } from 'komponenter/common/arbeidsflate-lenker/arbeidsflate-lenker';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { useCookies } from 'react-cookie';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { CookieName, cookieOptions } from '../../../../../server/cookieSettings';
import Tekst from 'tekster/finn-tekst';
import BEMHelper from 'utils/bem';
import { erNavDekoratoren } from 'utils/Environment';
import { getKbId, KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import './Arbeidsflatemeny.less';

const Arbeidsflatemeny = () => {
    const cls = BEMHelper('arbeidsflate');
    const dispatch = useDispatch();
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const [, setCookie] = useCookies([CookieName.DECORATOR_CONTEXT]);
    const arbeidsflate = useSelector((state: AppState) => state.arbeidsflate.status);

    return (
        <nav className={cls.className} id={cls.className} aria-label="Velg brukergruppe">
            <ul className={cls.element('topp-liste-rad')}>
                {arbeidsflateLenker(XP_BASE_URL).map((lenke, index) => {
                    return (
                        <li
                            aria-current={arbeidsflate === lenke.key ? 'page' : 'false'}
                            className={cls.element('liste-element')}
                            key={lenke.key}
                        >
                            <LenkeMedSporing
                                classNameOverride={cls.element('lenke')}
                                id={getKbId(KbNavGroup.HeaderMenylinje, {
                                    col: index,
                                    row: 0,
                                    sub: 0,
                                })}
                                href={lenke.url}
                                onClick={(event) => {
                                    setCookie(CookieName.DECORATOR_CONTEXT, lenke.key, cookieOptions);
                                    dispatch(settArbeidsflate(lenke.key));
                                    if (erNavDekoratoren()) {
                                        event.preventDefault();
                                    }
                                }}
                                analyticsEventArgs={{
                                    context: arbeidsflate,
                                    category: AnalyticsCategory.Header,
                                    action: 'arbeidsflate-valg',
                                    label: lenke.key,
                                }}
                            >
                                <div className={cls.element('lenke-inner', arbeidsflate === lenke.key ? 'active' : '')}>
                                    <Normaltekst>
                                        <Tekst id={lenke.lenkeTekstId} />
                                    </Normaltekst>
                                </div>
                            </LenkeMedSporing>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Arbeidsflatemeny;
