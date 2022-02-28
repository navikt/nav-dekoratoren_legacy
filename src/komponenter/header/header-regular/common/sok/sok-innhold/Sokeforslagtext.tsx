import React from 'react';
import { BodyLong } from '@navikt/ds-react';

const Sokeforslagtext = ({ highlight }: { highlight?: string }) => {
    const highlightFiltered = highlight
        ?.replace(/<\/?[^>]+(>|$)/g, '') // Remove html
        .replace(/\[.*?(\])/g, '') // Remove shortcodes
        .replace(/(\[|<).*?(\(...\))/g, ''); // Remove incomplete html/shortcodes;

    return (
        <div className="sok-resultat-listItem-text">
            <BodyLong>
                <span
                    dangerouslySetInnerHTML={{
                        __html: highlightFiltered || '',
                    }}
                />
            </BodyLong>
        </div>
    );
};

export default Sokeforslagtext;
