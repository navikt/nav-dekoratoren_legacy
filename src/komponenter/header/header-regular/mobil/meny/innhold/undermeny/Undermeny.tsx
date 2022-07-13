import React from 'react';
import { MenyNode } from 'store/reducers/menu-duck';
import BEMHelper from 'utils/bem';
import Lukkundermeny from '../elementer/Lukkundermeny';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { UndermenySeksjon } from './UndermenySeksjon';

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
            <Lukkundermeny className={menyClass.className} />
            {flatten ? (
                children.map((seksjon) => <UndermenySeksjon menyClass={menyClass} lenker={seksjon} />)
            ) : (
                <UndermenySeksjon menyClass={menyClass} lenker={lenker} />
            )}
            <Lukkundermeny className={menyClass.className} />
        </div>
    );
};
