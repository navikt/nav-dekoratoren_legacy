import React from 'react';
import { Normaltekst, Ingress } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import './ThankYou.less';

interface Props {
    showFeedbackUsage: boolean;
}

const Thankyou: React.FC<Props> = ({ showFeedbackUsage }) => {
    return (
        <div className="thankyou-container">
            <Ingress>
                <Tekst id="send-undersokelse-takk" />
            </Ingress>
            <div className="mellomrom" />
            {showFeedbackUsage && (
                <Normaltekst>
                    <Tekst id="hensikt-med-tilbakemelding" />
                </Normaltekst>
            )}
        </div>
    );
};

export default Thankyou;
