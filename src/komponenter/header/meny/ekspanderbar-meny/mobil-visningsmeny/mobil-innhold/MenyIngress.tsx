import React from 'react';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import Lenke from 'nav-frontend-lenker';
import { arbeidsflateLenker } from '../../../../arbeidsflatemeny/arbeidsflate-lenker';

const MenyIngress = ({
    className,
    inputext,
}: {
    className: string;
    inputext: string;
}) => {
    const lenke = arbeidsflateLenker.filter(lenke => lenke.tittel === inputext);
    const textToLowercase = inputext
        ? inputext.charAt(0).concat(inputext.slice(1).toLowerCase())
        : '';

    return (
        <div className={className}>
            <Undertittel>{textToLowercase}</Undertittel>

            <Lenke
                href={lenke[0].url}
                onClick={event => event.preventDefault()}
            >
                Til forsiden
            </Lenke>
        </div>
    );
};

export default MenyIngress;
