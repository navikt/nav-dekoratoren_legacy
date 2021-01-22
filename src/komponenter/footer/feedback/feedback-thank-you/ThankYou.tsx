import React from 'react';
import { Normaltekst, Ingress } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import './ThankYou.less';

const Thankyou = () => {
    return (
        <div className="thankyou-container">
            <Ingress>
                <Tekst id="send-undersokelse-takk" />
            </Ingress>
        </div>
    );
};

export default Thankyou;
