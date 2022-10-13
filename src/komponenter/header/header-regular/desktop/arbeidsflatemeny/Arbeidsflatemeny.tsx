import React from 'react';
import { BodyShort } from '@navikt/ds-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { arbeidsflateLenker } from 'komponenter/common/arbeidsflate-lenker/arbeidsflate-lenker';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { useCookies } from 'react-cookie';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { CookieName, cookieOptions } from '../../../../../server/cookieSettings';
import Tekst from 'tekster/finn-tekst';
import { erNavDekoratoren } from 'utils/Environment';
import { MenuValue } from '../../../../../utils/meny-storage-utils';
import { finnTekst } from 'tekster/finn-tekst';
import classNames from 'classnames';

import style from 'komponenter/header/header-regular/desktop/arbeidsflatemeny/Arbeidsflatemeny.module.scss';

export const arbeidsflatemenyWidthBreakpoint = 1200;

export const arbeidsflatemenyLenkeIds = [
    MenuValue.PRIVATPERSON,
    MenuValue.ARBEIDSGIVER,
    MenuValue.SAMARBEIDSPARTNER,
].map((value) => `arbeidsflate-${value}`);

const Arbeidsflatemeny = () => {
    const dispatch = useDispatch();
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const [, setCookie] = useCookies([CookieName.DECORATOR_CONTEXT]);
    const arbeidsflate = useSelector((state: AppState) => state.arbeidsflate.status);
    const { language } = useSelector((state: AppState) => state.language);

    return (
        <nav className={'arbeidsflate'} id={'arbeidsflate'} aria-label="Velg brukergruppe">
            <ul className={style.toppListeRad}>
                {arbeidsflateLenker(XP_BASE_URL).map((lenke, index) => {
                    return (
                        <li
                            aria-current={arbeidsflate === lenke.key ? 'page' : 'false'}
                            className={style.listeElement}
                            key={lenke.key}
                        >
                            <LenkeMedSporing
                                classNameOverride={classNames(
                                    style.lenke,
                                    arbeidsflate === lenke.key ? style.active : ''
                                )}
                                id={arbeidsflatemenyLenkeIds[index]}
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
                                <div className={style.lenkeInner} data-text={finnTekst(lenke.lenkeTekstId, language)}>
                                    <BodyShort>
                                        <Tekst id={lenke.lenkeTekstId} />
                                    </BodyShort>
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
