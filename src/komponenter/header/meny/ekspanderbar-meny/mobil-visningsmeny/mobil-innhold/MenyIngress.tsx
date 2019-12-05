import React from 'react';
import Sidetittel from 'nav-frontend-typografi/lib/sidetittel';
import Tekst from '../../../../../../tekster/finn-tekst';

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
