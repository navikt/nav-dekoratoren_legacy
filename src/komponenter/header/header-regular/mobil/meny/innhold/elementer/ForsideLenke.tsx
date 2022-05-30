import React from 'react';
import { MenuValue } from 'utils/meny-storage-utils';
import { Heading } from '@navikt/ds-react';
import BEMHelper from 'utils/bem';
import Tekst from 'tekster/finn-tekst';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { valgtbedrift } from 'komponenter/common/arbeidsflate-lenker/hovedmeny-arbeidsflate-lenker';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { AnalyticsCategory } from '../../../../../../../utils/analytics/analytics';

interface Props {
    arbeidsflate: MenuValue;
    erInnlogget: boolean;
}

const ForsideLenke = (props: Props) => {
    const cls = BEMHelper('forsideLenke');
    const { DITT_NAV_URL, MINSIDE_ARBEIDSGIVER_URL } = useSelector((state: AppState) => state.environment);

    if (!props.erInnlogget) {
        return null;
    }

    const arbeidsgiverHref = MINSIDE_ARBEIDSGIVER_URL + valgtbedrift();

    return (
        <>
            {props.arbeidsflate === MenuValue.PRIVATPERSON && (
                <div className={cls.className}>
                    <Heading level="2" size="small" className={cls.element('ingress')}>
                        <Tekst id="min-side" />
                    </Heading>
                    <LenkeMedSporing
                        href={DITT_NAV_URL}
                        className={cls.element('lenke')}
                        analyticsEventArgs={{
                            category: AnalyticsCategory.Header,
                            action: 'dittnav',
                            label: DITT_NAV_URL,
                            lenkegruppe: 'innlogget meny',
                        }}
                    >
                        <Tekst id="til-dittnav-forside" />
                    </LenkeMedSporing>
                </div>
            )}
            {props.arbeidsflate === MenuValue.ARBEIDSGIVER && (
                <div className={cls.className}>
                    <Heading level="2" size="small" className={cls.element('ingress')}>
                        <Tekst id="min-side-arbeidsgiver" />
                    </Heading>
                    <LenkeMedSporing
                        href={arbeidsgiverHref}
                        className={cls.element('lenke')}
                        analyticsEventArgs={{
                            category: AnalyticsCategory.Header,
                            action: 'minside-arbeidsgiver',
                            label: arbeidsgiverHref,
                        }}
                    >
                        <Tekst id="ga-til-min-side-arbeidsgiver" />
                    </LenkeMedSporing>
                </div>
            )}
        </>
    );
};

export default ForsideLenke;
