import React from 'react';
import { Heading } from '@navikt/ds-react';
import { arbeidsflateLenker } from 'komponenter/common/arbeidsflate-lenker/arbeidsflate-lenker';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import Tekst from '../../../../../../../../tekster/finn-tekst';
import { MenuValue } from '../../../../../../../../utils/meny-storage-utils';

import './MobilHovedmenyHeader.less';

const stateSelector = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    XP_BASE_URL: state.environment.XP_BASE_URL,
});

export const MobilHovedmenyHeader = () => {
    const { XP_BASE_URL, arbeidsflate } = useSelector(stateSelector);

    const lenke = arbeidsflateLenker(XP_BASE_URL).find((item) => item.key === arbeidsflate);

    return (
        <div className={'mobilMenyHeader'}>
            {arbeidsflate !== MenuValue.PRIVATPERSON && (
                <Heading level="2" size="small">
                    <Tekst id={`rolle-${arbeidsflate}`} />
                </Heading>
            )}
            <LenkeMedSporing href={lenke?.url || 'https://nav.no'}>{'Til forsiden'}</LenkeMedSporing>
        </div>
    );
};
