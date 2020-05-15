import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

const Sokeforslagtext = ({ highlight }: { highlight?: string }) => {
    const highlightFiltered =
        highlight &&
        highlight
            .replace(/<\/?[^>]+(>|$)/g, '') // Remove html
            .replace(/\[.*?(\])/g, '') // Remove shortcodes
            .replace(/(\[|<).*?(\(...\))/g, ''); // Remove incomplete html/shortcodes;

    return (
        <div className="sok-resultat-listItem-text">
            <Normaltekst>{highlightFiltered || ''}</Normaltekst>
        </div>
    );
};

export default Sokeforslagtext;
