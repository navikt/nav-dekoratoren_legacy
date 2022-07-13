import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import BEMHelper from 'utils/bem';
import { Locale } from 'store/reducers/language-duck';
import { bunnLenker } from 'komponenter/common/arbeidsflate-lenker/hovedmeny-arbeidsflate-lenker';
import ArbeidsflateLenkepanel from 'komponenter/common/arbeidsflate-lenkepanel/ArbeidsflateLenkepanel';
import { AnalyticsCategory } from 'utils/analytics/analytics';

import './MobilArbeidsflateValg.less';
import { MenuValue } from '../../../../../../../../utils/meny-storage-utils';
import { MobilArbeidsflateValgPrivat } from './MobilArbeidsflateValgPrivat';

const cls = BEMHelper('mobil-arbeidsflate-valg');

const stateProps = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    environment: state.environment,
});

type Props = {
    lang: Locale;
};

export const MobilArbeidsflateValg = ({ lang }: Props) => {
    const { arbeidsflate, environment } = useSelector(stateProps);
    const lenker = bunnLenker(environment)[arbeidsflate];

    if (arbeidsflate === MenuValue.PRIVATPERSON) {
        return <MobilArbeidsflateValgPrivat lenker={lenker} />;
    }

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
                        withDescription={false}
                        enableCompactView={true}
                    />
                </li>
            ))}
        </ul>
    );
};
