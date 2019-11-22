import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

const Sokeforslagtext = ({ highlight }: { highlight?: string }) => {
    return (
        <div className="sok-resultat-listItem-text">
            <Normaltekst>
                {highlight ? highlight.replace(/<\/?[^>]+(>|$)/g, '') : ''}
            </Normaltekst>
        </div>
    );
};

export default Sokeforslagtext;
