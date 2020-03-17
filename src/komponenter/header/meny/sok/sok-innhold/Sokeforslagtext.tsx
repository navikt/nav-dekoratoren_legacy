import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

const Sokeforslagtext = ({ highlight }: { highlight?: string }) => {
    return (
        <div className="sok-resultat-listItem-text">
            <Normaltekst>
                <span
                    dangerouslySetInnerHTML={{
                        __html: (highlight || '')
                            .replace(/<\/?[^>]+(>|$)/g, '') // Remove html
                            .replace(/\[.*?\]/g, ''), // Remove shortcodes
                    }}
                />
            </Normaltekst>
        </div>
    );
};

export default Sokeforslagtext;
