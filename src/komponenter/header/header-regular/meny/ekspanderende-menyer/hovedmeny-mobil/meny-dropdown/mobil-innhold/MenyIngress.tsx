import React from 'react';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import Lenke from 'nav-frontend-lenker';
import { arbeidsflateLenker } from 'komponenter/header/header-regular/arbeidsflatemeny/arbeidsflate-lenker';
import { useSelector } from 'react-redux';
import { AppState } from 'reducers/reducers';

const MenyIngress = ({
    className,
    inputext,
    tabindex,
}: {
    className: string;
    inputext: string;
    tabindex: boolean;
}) => {
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const lenke = arbeidsflateLenker(XP_BASE_URL).filter(
        lenke => lenke.key === inputext
    );

    const textToLowercase = inputext
        ? inputext.charAt(0).concat(inputext.slice(1).toLowerCase())
        : '';

    return (
        <div className={className}>
            <Undertittel>{textToLowercase}</Undertittel>
            <Lenke
                href={lenke[0].url ? lenke[0].url : 'https://nav.no'}
                onClick={event => event.preventDefault()}
                tabIndex={tabindex ? 0 : -1}
            >
                Til forsiden
            </Lenke>
        </div>
    );
};

export default MenyIngress;
