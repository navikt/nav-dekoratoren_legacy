import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';

interface Props {
    className: string;
    displayName?: string;
}
const SokeforslagIngress = (props: Props) => {
    const { className, displayName } = props;
    return (
        <>
            <div className="media-sm-mobil sokeforslag-ingress">
                <div className={className}>
                    <div className="sok-resultat-chevron">
                        <HoyreChevron />
                    </div>
                    <div className="overskrift">
                        <Undertittel>{displayName}</Undertittel>
                    </div>
                </div>
            </div>
            <div className="media-tablet-desktop sokeforslag-ingress">
                <div className="overskrift">
                    <Undertittel>{displayName}</Undertittel>
                </div>
            </div>
        </>
    );
};

export default SokeforslagIngress;
