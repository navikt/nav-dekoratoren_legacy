import React from 'react';
import { MenuValue } from 'utils/meny-storage-utils';
import { Heading } from '@navikt/ds-react';
import Tekst from 'tekster/finn-tekst';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { valgtbedrift } from 'komponenter/common/arbeidsflate-lenker/hovedmeny-arbeidsflate-lenker';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { AnalyticsCategory } from '../../../../../../../../utils/analytics/analytics';

import './MobilInnloggetForsideLenke.less';

const stateSelector = (state: AppState) => ({
    DITT_NAV_URL: state.environment.DITT_NAV_URL,
    MINSIDE_ARBEIDSGIVER_URL: state.environment.MINSIDE_ARBEIDSGIVER_URL,
    arbeidsflate: state.arbeidsflate.status,
});

export const MobilInnloggetForsideLenke = () => {
    const { DITT_NAV_URL, MINSIDE_ARBEIDSGIVER_URL, arbeidsflate } = useSelector(stateSelector);

    const lenkeProps =
        arbeidsflate === MenuValue.PRIVATPERSON
            ? {
                  tekstIdHeader: 'min-side',
                  tekstIdLenke: 'til-dittnav-forside',
                  href: DITT_NAV_URL,
                  analyticsAction: 'dittnav',
              }
            : arbeidsflate === MenuValue.ARBEIDSGIVER
            ? {
                  tekstIdHeader: 'min-side-arbeidsgiver',
                  tekstIdLenke: 'til-dittnav-forside',
                  href: MINSIDE_ARBEIDSGIVER_URL + valgtbedrift(),
                  analyticsAction: 'minside-arbeidsgiver',
              }
            : null;

    if (!lenkeProps) {
        return null;
    }

    return (
        <>
            <Heading level="2" size="small">
                <Tekst id={lenkeProps.tekstIdHeader} />
            </Heading>
            <LenkeMedSporing
                href={lenkeProps.href}
                className={'mobilInnloggetForsideLenke'}
                analyticsEventArgs={{
                    category: AnalyticsCategory.Header,
                    action: lenkeProps.analyticsAction,
                    label: lenkeProps.href,
                    lenkegruppe: 'innlogget meny',
                }}
            >
                <Tekst id={lenkeProps.tekstIdLenke} />
            </LenkeMedSporing>
        </>
    );
};
