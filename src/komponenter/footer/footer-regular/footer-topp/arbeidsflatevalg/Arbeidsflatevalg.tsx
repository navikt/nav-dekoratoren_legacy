import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ArbeidsflateLenke, arbeidsflateLenker } from 'komponenter/common/arbeidsflate-lenker/arbeidsflate-lenker';
import { AppState } from 'store/reducers';
import { GACategory } from 'utils/google-analytics';
import { Locale } from 'store/reducers/language-duck';
import ArbeidsflateLenkepanel from 'komponenter/common/arbeidsflate-lenkepanel/ArbeidsflateLenkepanel';
import './Arbeidsflatevalg.less';

const stateSelector = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    language: state.language.language,
});

const Arbeidsflatevalg = () => {
    const { arbeidsflate, language } = useSelector(stateSelector);
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);

    const getLenker = () =>
        arbeidsflateLenker(XP_BASE_URL).filter(
            (lenke) => lenke.key !== arbeidsflate
        );

    const [lenker, setLenker] = useState<ArbeidsflateLenke[]>(getLenker());
    useEffect(() => {
        setLenker(getLenker());
    }, [arbeidsflate]);

    return language === Locale.BOKMAL || language === Locale.NYNORSK ? (
        <div className="menylenker-seksjon arbeidsflate">
            <ul className="arbeidsflatevalg">
                {lenker.map((lenke: ArbeidsflateLenke) => (
                    <li key={lenke.key}>
                        <ArbeidsflateLenkepanel
                            lenke={lenke}
                            language={language}
                            gaEventArgs={{
                                context: arbeidsflate,
                                category: GACategory.Header,
                                action: 'arbeidsflate-valg',
                            }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    ) : null;
};

export default Arbeidsflatevalg;
