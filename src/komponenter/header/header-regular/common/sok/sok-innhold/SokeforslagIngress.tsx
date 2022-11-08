import React from 'react';
import { Next } from '@navikt/ds-icons';
import { Heading } from '@navikt/ds-react';

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
                        <Next aria-hidden />
                    </div>
                    <div className="overskrift">
                        <Heading level="2" size="small">
                            {displayName}
                        </Heading>
                    </div>
                </div>
            </div>
            <div className="media-tablet-desktop sokeforslag-ingress">
                <div className="overskrift">
                    <Heading level="2" size="small">
                        {displayName}
                    </Heading>
                </div>
            </div>
        </>
    );
};

export default SokeforslagIngress;
