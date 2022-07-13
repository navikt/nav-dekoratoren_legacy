import React from 'react';
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

    if (!lenker?.children) {
        return null;
    }

    const menyClass = BEMHelper(className);

    const { flatten, children } = lenker;

    return (
        <div className={menyClass.element('undermeny-innhold', underMenuIsOpen ? '' : 'hidden')}>
            <MobilUndermenyLukk />
            {flatten ? (
                children.map((seksjon) => (
                    <MobilUndermenySeksjon menyClass={menyClass} lenker={seksjon} key={seksjon.id} />
                ))
            ) : (
                <MobilUndermenySeksjon menyClass={menyClass} lenker={lenker} />
            )}
        </div>
    );
};
