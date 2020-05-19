import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { Normaltekst } from 'nav-frontend-typografi';
import { arbeidsflateLenker } from 'komponenter/header/header-regular/common/arbeidsflate-lenker/arbeidsflate-lenker';
import { GACategory } from 'utils/google-analytics';
import { LenkeMedGA } from 'komponenter/common/LenkeMedGA';
import { useCookies } from 'react-cookie';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { cookieOptions } from 'store/reducers/arbeidsflate-duck';
import Tekst from 'tekster/finn-tekst';
import BEMHelper from 'utils/bem';
import { erNavDekoratoren } from 'utils/Environment';
import { getKbId, KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import './Arbeidsflatemeny.less';

const Arbeidsflatemeny = () => {
    const cls = BEMHelper('arbeidsflate');
    const dispatch = useDispatch();
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const [, setCookie] = useCookies(['decorator-context']);
    const arbeidsflate = useSelector(
        (state: AppState) => state.arbeidsflate.status
    );

    return (
        <nav
            className={cls.className}
            id={cls.className}
            aria-label="Velg brukergruppe"
        >
            <ul className={cls.element('topp-liste-rad')} role="tablist">
                {arbeidsflateLenker(XP_BASE_URL).map((lenke, index) => {
                    return (
                        <li
                            role="tab"
                            aria-selected={arbeidsflate === lenke.key}
                            className={cls.element('liste-element')}
                            key={lenke.key}
                        >
                            <LenkeMedGA
                                classNameOverride={cls.element('lenke')}
                                id={getKbId(KbNavGroup.HeaderMenylinje, {
                                    col: index,
                                    row: 0,
                                    sub: 0,
                                })}
                                href={lenke.url}
                                onClick={(event) => {
                                    event.preventDefault();
                                    setCookie(
                                        'decorator-context',
                                        lenke.key,
                                        cookieOptions
                                    );
                                    if (erNavDekoratoren()) {
                                        dispatch(settArbeidsflate(lenke.key));
                                    } else {
                                        window.location.href = lenke.url;
                                    }
                                }}
                                gaEventArgs={{
                                    context: arbeidsflate,
                                    category: GACategory.Header,
                                    action: 'arbeidsflate-valg',
                                }}
                            >
                                <div
                                    className={cls.element(
                                        'lenke-inner',
                                        arbeidsflate === lenke.key
                                            ? 'active'
                                            : ''
                                    )}
                                >
                                    <Normaltekst>
                                        <Tekst id={lenke.lenkeTekstId} />
                                    </Normaltekst>
                                </div>
                            </LenkeMedGA>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Arbeidsflatemeny;
