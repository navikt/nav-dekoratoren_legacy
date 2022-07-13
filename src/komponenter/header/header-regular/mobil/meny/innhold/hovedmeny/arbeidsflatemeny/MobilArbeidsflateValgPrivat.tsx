import React from 'react';
import {
    ArbeidsflateLenkeData,
    dittNavLenkeData,
} from '../../../../../../../common/arbeidsflate-lenker/hovedmeny-arbeidsflate-lenker';
import { LenkeMedSporing } from '../../../../../../../common/lenke-med-sporing/LenkeMedSporing';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../../store/reducers';
import Tekst from '../../../../../../../../tekster/finn-tekst';
import {
    arbeidsgiverContextLenke,
    samarbeidspartnerContextLenke,
} from '../../../../../../../common/arbeidsflate-lenker/arbeidsflate-lenker';

import './MobilArbeidsflateValgPrivat.less';

const stateSelector = (state: AppState) => ({
    dittNavUrl: state.environment.DITT_NAV_URL,
    xpBaseUrl: state.environment.XP_BASE_URL,
});

type Props = {
    lenker: ArbeidsflateLenkeData[];
};

export const MobilArbeidsflateValgPrivat = ({ lenker }: Props) => {
    const { dittNavUrl, xpBaseUrl } = useSelector(stateSelector);

    const dittNavLenke = dittNavLenkeData(dittNavUrl);
    const arbgiverLenke = arbeidsgiverContextLenke(xpBaseUrl);
    const samarbeidspartnerLenke = samarbeidspartnerContextLenke(xpBaseUrl);

    return (
        <>
            <LenkeMedSporing href={dittNavLenke.url}>
                <Tekst id={dittNavLenke.lenkeTekstId} />
            </LenkeMedSporing>

            <div className={'arbeidsflateValgMobilPrivat'}>
                <LenkeMedSporing href={arbgiverLenke.url}>
                    <Tekst id={arbgiverLenke.lenkeTekstId} />
                </LenkeMedSporing>
                <LenkeMedSporing href={samarbeidspartnerLenke.url}>
                    <Tekst id={samarbeidspartnerLenke.lenkeTekstId} />
                </LenkeMedSporing>
            </div>
        </>
    );
};
