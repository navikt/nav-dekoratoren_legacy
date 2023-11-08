import React from 'react';
import { Heading } from '@navikt/ds-react';
import { arbeidsflateLenker } from 'komponenter/common/arbeidsflate-lenker/arbeidsflate-lenker';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import Tekst from 'tekster/finn-tekst';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import 'komponenter/header/header-regular/mobil/meny/innhold/hovedmeny/header/MobilHovedmenyHeader.scss';
import { LangKey } from 'tekster/ledetekster';

const stateSelector = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    XP_BASE_URL: state.environment.XP_BASE_URL,
});

export const MobilHovedmenyHeader = () => {
    const { XP_BASE_URL, arbeidsflate } = useSelector(stateSelector);
    const { language } = useSelector((state: AppState) => state.language);

    const lenke = arbeidsflateLenker(XP_BASE_URL, language).find((item) => item.key === arbeidsflate);

    const href = lenke?.url || 'https://www.nav.no';

    return (
        <div className={'mobilMenyHeader'}>
            <Heading level="2" size="small">
                <Tekst id={`rolle-${arbeidsflate}` as LangKey} />
            </Heading>
            <LenkeMedSporing
                href={href}
                className={'mobilMenyHeaderLenke'}
                analyticsEventArgs={{
                    context: arbeidsflate,
                    category: AnalyticsCategory.Meny,
                    action: 'Til forsiden',
                    label: href,
                }}
            >
                <Tekst id={'til-forsiden'} />
            </LenkeMedSporing>
        </div>
    );
};
