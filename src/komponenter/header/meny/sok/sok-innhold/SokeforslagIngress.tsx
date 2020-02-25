import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';

const SokeforslagIngress = ({
    className,
    displayName,
}: {
    className: string;
    displayName?: string;
}) => {
    return (
        <>
            <div className="media-sm-mobil sokeforslag-ingress">
                <div className={className}>
                    <div className="sok-resultat-chevron">
                        <HoyreChevron />
                    </div>
                    <div className="overskrift">
                        <Undertittel>
                            {displayName ? displayName : 'Ingen treff å vise.'}
                        </Undertittel>
                    </div>
                </div>
            </div>
            <div className="media-tablet-desktop sokeforslag-ingress">
                <div className="overskrift">
                    <Undertittel>
                        {displayName ? displayName : 'Ingen treff å vise.'}
                    </Undertittel>
                </div>
            </div>
        </>
    );
};

export default SokeforslagIngress;
