import React, { useEffect, useRef } from 'react';
import { MenyNode } from 'store/reducers/menu-duck';
import BEMHelper from 'utils/bem';
import { MobilUndermenyLukk } from './MobilUndermenyLukk';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { MobilUndermenySeksjon } from './MobilUndermenySeksjon';

const stateSelector = (state: AppState) => ({
    underMenuIsOpen: state.dropdownToggles.undermeny,
});

type Props = {
    className: string;
    lenker: MenyNode;
};

export const MobilUndermeny = ({ lenker, className }: Props) => {
    const { underMenuIsOpen } = useSelector(stateSelector);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (underMenuIsOpen) {
            const backButton = document.getElementsByClassName('mobilUndermenyLukk')[0] as HTMLElement;
            backButton.focus();
            backButton.blur();
        }
    }, [underMenuIsOpen]);

    if (!lenker?.children) {
        return null;
    }

    const menyClass = BEMHelper(className);

    return (
        <div className={menyClass.element('undermeny-innhold', underMenuIsOpen ? '' : 'hidden')}>
            <MobilUndermenyLukk />
            <MobilUndermenySeksjon lenker={lenker} forwardRef={ref} />
        </div>
    );
};
