import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { arbeidsflateLenker } from 'komponenter/common/arbeidsflate-lenker/arbeidsflate-lenker';
import { ArbeidsflateLenke } from 'komponenter/common/arbeidsflate-lenker/arbeidsflate-lenker';
import { AppState } from 'store/reducers';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import { Locale } from 'store/reducers/language-duck';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import Tekst from 'tekster/finn-tekst';
import './Arbeidsflatevalg.less';

const stateSelector = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    language: state.language.language,
});

const Arbeidsflatevalg = () => {
    const { arbeidsflate, language } = useSelector(stateSelector);
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);

    const getLenker = () => arbeidsflateLenker(XP_BASE_URL).filter((lenke) => lenke.key !== arbeidsflate);

    const [lenker, setLenker] = useState<ArbeidsflateLenke[]>(getLenker());
    useEffect(() => {
        setLenker(getLenker());
    }, [arbeidsflate]);

    return language === Locale.BOKMAL || language === Locale.NYNORSK ? (
        <div className="menylenker-seksjon">
            <ul className="arbeidsflatevalg">
                {lenker.map((lenke: ArbeidsflateLenke) => (
                    <li key={lenke.key}>
                        <LenkeMedSporing
                            href={lenke.url}
                            analyticsEventArgs={{
                                context: arbeidsflate,
                                category: AnalyticsCategory.Footer,
                                action: 'arbeidsflate-valg',
                                label: lenke.key,
                            }}
                            withChevron
                        >
                            <Tekst id={lenke.lenkeTekstId} />
                        </LenkeMedSporing>
                    </li>
                ))}
            </ul>
        </div>
    ) : null;
};

export default Arbeidsflatevalg;
