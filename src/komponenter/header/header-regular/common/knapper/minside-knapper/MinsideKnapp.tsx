import React from 'react';
import { minsideDropdownClassname } from 'komponenter/header/header-regular/desktop/minside-meny/MinsideMeny';
import { MenuValue } from 'utils/meny-storage-utils';
import MinsideArbgiverKnapp from './MinsideArbgiverKnapp';
import { MinsidePersonKnapp } from './MinsidePersonKnapp';
import 'komponenter/header/header-regular/common/knapper/minside-knapper/MinsideKnapp.less';

export const minsideKnappId = 'desktop-minside-knapp-id';

type Props = {
    arbeidsflate: MenuValue;
};

export const MinsideKnapp = ({ arbeidsflate }: Props) => {
    if (arbeidsflate === MenuValue.PRIVATPERSON) {
        return (
            <MinsidePersonKnapp
                classname={minsideDropdownClassname}
                id={minsideKnappId}
            />
        );
    }

    if (arbeidsflate === MenuValue.ARBEIDSGIVER) {
        return (
            <MinsideArbgiverKnapp
                classname={minsideDropdownClassname}
                id={minsideKnappId}
            />
        );
    }

    return null;
};
