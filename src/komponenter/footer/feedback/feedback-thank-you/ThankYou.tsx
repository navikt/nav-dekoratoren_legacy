import React from 'react';
import { Normaltekst, Ingress } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import './ThankYou.less';

const Thankyou = () => {
    const { environment } = useSelector((state: AppState) => state);
    return (
        <div className="thankyou-container">
            <Ingress>
                <Tekst id="send-undersokelse-takk" />
            </Ingress>
            <div className="mellomrom" />
            <Normaltekst>
                <Tekst id="hensikt-med-tilbakemelding" />
            </Normaltekst>
            <LenkeMedSporing href={`${environment.XP_BASE_URL}/person/kontakt-oss`}>
                <Tekst id="hensikt-med-tilbakemelding-lenke" />
            </LenkeMedSporing>
        </div>
    );
};

export default Thankyou;
