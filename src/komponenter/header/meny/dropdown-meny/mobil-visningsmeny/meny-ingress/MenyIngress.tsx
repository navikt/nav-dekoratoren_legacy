import React from 'react';
import Innholdstittel from 'nav-frontend-typografi/lib/innholdstittel';
import Tekst from '../../../../../../tekster/finn-tekst';

const MenyIngress = ({ className }: { className: string }) => {
    return (
        <div className={className}>
            <Innholdstittel>
                <Tekst id="meny-slideout-ingress" />
            </Innholdstittel>
        </div>
    );
};

export default MenyIngress;
