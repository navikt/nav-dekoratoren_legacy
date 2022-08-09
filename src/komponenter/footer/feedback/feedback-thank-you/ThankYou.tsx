import React from 'react';
import { Ingress, BodyLong } from '@navikt/ds-react';
import Tekst from 'tekster/finn-tekst';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { MenuValue } from 'utils/meny-storage-utils';
import style from './ThankYou.module.scss';

const ThankYou = () => {
    const { environment, arbeidsflate } = useSelector((state: AppState) => state);
    const kontaktOssUrl =
        arbeidsflate.status === MenuValue.ARBEIDSGIVER
            ? 'https://arbeidsgiver.nav.no/kontakt-oss'
            : `${environment.XP_BASE_URL}/person/kontakt-oss`;

    return (
        <div className={style.thankyouContainer}>
            <Ingress>
                <Tekst id="send-undersokelse-takk" />
            </Ingress>
            <div className={style.mellomrom} />
            <BodyLong>
                <Tekst id="hensikt-med-tilbakemelding" />
            </BodyLong>
            <LenkeMedSporing href={kontaktOssUrl}>
                <Tekst id="hensikt-med-tilbakemelding-lenke" />
            </LenkeMedSporing>
        </div>
    );
};

export default ThankYou;
