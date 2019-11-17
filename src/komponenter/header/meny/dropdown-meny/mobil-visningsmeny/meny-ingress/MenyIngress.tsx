import React from 'react';
import Tekst from '../../../../../../tekster/finn-tekst';
import Sidetittel from 'nav-frontend-typografi/lib/sidetittel';

const MenyIngress = ({ className }: { className: string }) => {
    return (
        <div className={className}>
            <Sidetittel>
                <Tekst id="meny-slideout-ingress" />
            </Sidetittel>
        </div>
    );
};

export default MenyIngress;
