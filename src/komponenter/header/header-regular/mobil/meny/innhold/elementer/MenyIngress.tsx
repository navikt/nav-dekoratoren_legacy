import React from 'react';
import { Heading } from '@navikt/ds-react';
import { arbeidsflateLenker } from 'komponenter/common/arbeidsflate-lenker/arbeidsflate-lenker';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';

const MenyIngress = ({ className, inputext }: { className: string; inputext: string }) => {
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const lenke = arbeidsflateLenker(XP_BASE_URL).filter((item) => item.key === inputext);

    const textToLowercase = inputext ? inputext.toUpperCase().charAt(0).concat(inputext.slice(1).toLowerCase()) : '';

    if (!lenke.length) {
        return null;
    }

    return (
        <div className={className}>
            <Heading level="2" size="small">
                {textToLowercase}
            </Heading>
            <LenkeMedSporing href={lenke[0].url ? lenke[0].url : 'https://nav.no'}>Til forsiden</LenkeMedSporing>
        </div>
    );
};

export default MenyIngress;
