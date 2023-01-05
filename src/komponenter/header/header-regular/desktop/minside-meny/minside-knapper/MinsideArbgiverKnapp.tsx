import React from 'react';
import { BodyShort, Detail } from '@navikt/ds-react';
import Tekst from 'tekster/finn-tekst';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { valgtbedrift } from 'komponenter/common/arbeidsflate-lenker/hovedmeny-arbeidsflate-lenker';
import { minsideKnappId } from 'komponenter/header/header-regular/desktop/minside-meny/Minsidemeny';
import { Bag } from '@navikt/ds-icons';

import style from 'komponenter/header/header-regular/desktop/minside-meny/minside-knapper/MinsideKnapper.module.scss';

export const MinsideArbgiverKnapp = () => {
    const { environment } = useSelector((state: AppState) => state);
    const href = environment.MINSIDE_ARBEIDSGIVER_URL + valgtbedrift();

    return (
        <LenkeMedSporing
            classNameOverride={style.arbgiverKnapp}
            id={minsideKnappId}
            href={href}
            analyticsEventArgs={{
                category: AnalyticsCategory.Header,
                action: 'minside-arbeidsgiver',
                label: href,
            }}
        >
            <Bag aria-hidden />
            <div className={style.knappTekst} data-testid={'minside-arbeidsgiver'}>
                <BodyShort className={style.knappTekstTopp}>
                    <Tekst id={'ga-til-min-side-arbeidsgiver'} />
                </BodyShort>
                <Detail className={style.knappTekstBunn}>
                    <Tekst id={'rolle-arbeidsgiver'} />
                </Detail>
            </div>
        </LenkeMedSporing>
    );
};

export default MinsideArbgiverKnapp;
