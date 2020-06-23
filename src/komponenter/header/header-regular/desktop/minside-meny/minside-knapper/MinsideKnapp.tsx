import React from 'react';
import { minsideDropdownClassname } from '../MinsideMeny';
import { MenuValue } from 'utils/meny-storage-utils';
import MinsideArbgiverKnapp from './MinsideArbgiverKnapp';
import { MinsidePersonKnapp } from './MinsidePersonKnapp';
import './MinsideKnapp.less';

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
