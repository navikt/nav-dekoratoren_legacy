import React from 'react';
import { Link, Label } from '@navikt/ds-react';
import { Back } from '@navikt/ds-icons';
import Tekst from 'tekster/finn-tekst';
import { useDispatch } from 'react-redux';
import { toggleUndermenyVisning } from 'store/reducers/dropdown-toggle-duck';
import { mobilmenyKnappId } from '../../../HovedmenyMobil';

import 'komponenter/header/header-regular/mobil/meny/innhold/undermeny/MobilUndermenyLukk.scss';

const focusMenuButton = () => {
    const menuButton = document.getElementById(mobilmenyKnappId);
    if (!menuButton) {
        return;
    }

    menuButton.focus();
};

export const MobilUndermenyLukk = () => {
    const dispatch = useDispatch();

    return (
        <Link
            href={'#'}
            onClick={(event) => {
                event.preventDefault();
                dispatch(toggleUndermenyVisning());
                focusMenuButton();
            }}
            className={'mobilUndermenyLukk'}
        >
            <Back />
            <Label>
                <Tekst id="tilbake-til-overskrift" />
            </Label>
        </Link>
    );
};
