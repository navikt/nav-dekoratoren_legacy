import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import BEMHelper from 'utils/bem';
import { Locale } from 'store/reducers/language-duck';
import { bunnLenker } from 'komponenter/common/arbeidsflate-lenker/hovedmeny-arbeidsflate-lenker';
import ArbeidsflateLenkepanel from 'komponenter/common/arbeidsflate-lenkepanel/ArbeidsflateLenkepanel';
import { ArbeidsflateLenke } from 'komponenter/common/arbeidsflate-lenker/arbeidsflate-lenker';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import './MobilarbeidsflateValg.less';

interface Props {
    lang: Locale;
}

const stateProps = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    environment: state.environment,
});

const MobilarbeidsflateValg = ({ lang }: Props) => {
    const { arbeidsflate, environment } = useSelector(stateProps);
    const cls = BEMHelper('mobil-arbeidsflate-valg');
    const lenker = bunnLenker(environment)[arbeidsflate] as ArbeidsflateLenke[];

    return (
        <ul className={cls.className}>
            {lenker.map((lenke, i) => (
                <li key={i} className={cls.element('liste-element')}>
                    <ArbeidsflateLenkepanel
                        lenke={lenke}
                        language={lang}
                        analyticsEventArgs={{
                            context: arbeidsflate,
                            category: AnalyticsCategory.Meny,
                            action: 'arbeidsflate-valg',
                            label: lenke.key,
                        }}
                    />
                </li>
            ))}
        </ul>
    );
};

export default MobilarbeidsflateValg;
