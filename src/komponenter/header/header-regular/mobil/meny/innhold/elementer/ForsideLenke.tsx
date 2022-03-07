import React from 'react';
import { MenuValue } from 'utils/meny-storage-utils';
import { Heading } from '@navikt/ds-react';
import BEMHelper from 'utils/bem';
import Tekst from 'tekster/finn-tekst';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { valgtbedrift } from 'komponenter/common/arbeidsflate-lenker/hovedmeny-arbeidsflate-lenker';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';

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

    return (
        <>
            {props.arbeidsflate === MenuValue.PRIVATPERSON && (
                <div className={cls.className}>
                    <Heading level="2" size="small" className={cls.element('ingress')}>
                        <Tekst id="min-side" />
                    </Heading>
                    <LenkeMedSporing href={DITT_NAV_URL} className={cls.element('lenke')}>
                        <Tekst id="til-dittnav-forside" />
                    </LenkeMedSporing>
                </div>
            )}
            {props.arbeidsflate === MenuValue.ARBEIDSGIVER && (
                <div className={cls.className}>
                    <Heading level="2" size="small" className={cls.element('ingress')}>
                        <Tekst id="min-side-arbeidsgiver" />
                    </Heading>
                    <LenkeMedSporing href={MINSIDE_ARBEIDSGIVER_URL + valgtbedrift()} className={cls.element('lenke')}>
                        <Tekst id="ga-til-min-side-arbeidsgiver" />
                    </LenkeMedSporing>
                </div>
            )}
        </>
    );
};

export default ForsideLenke;
