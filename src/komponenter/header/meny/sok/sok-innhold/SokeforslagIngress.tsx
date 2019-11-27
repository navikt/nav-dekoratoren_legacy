import React from 'react';
import MediaQuery from 'react-responsive';
import { Undertittel } from 'nav-frontend-typografi';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import { mobileview } from '../../../../../api/api';

const SokeforslagIngress = ({
    className,
    displayName,
}: {
    className: string;
    displayName?: string;
}) => {
    return (
        <>
            <MediaQuery maxWidth={mobileview - 1}>
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
            </MediaQuery>
            <MediaQuery minWidth={mobileview}>
                <div className="overskrift">
                    <Undertittel>
                        {displayName ? displayName : 'Ingen treff å vise.'}
                    </Undertittel>
                </div>
            </MediaQuery>
        </>
    );
};

export default SokeforslagIngress;
