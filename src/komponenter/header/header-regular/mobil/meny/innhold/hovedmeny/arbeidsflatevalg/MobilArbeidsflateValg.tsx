import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { Locale } from 'store/reducers/language-duck';
import { bunnLenker } from 'komponenter/common/arbeidsflate-lenker/hovedmeny-arbeidsflate-lenker';
import ArbeidsflateLenkepanel from 'komponenter/common/arbeidsflate-lenkepanel/ArbeidsflateLenkepanel';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import { UnstyledList } from '../../utils/UnstyledList';

import 'komponenter/header/header-regular/mobil/meny/innhold/hovedmeny/arbeidsflatevalg/MobilArbeidsflateValg.scss';

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

    return (
        <UnstyledList className={'mobilArbeidsflateValg'}>
            {lenker.map((lenke, index) => (
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
                    key={index}
                />
            ))}
        </UnstyledList>
    );
};
