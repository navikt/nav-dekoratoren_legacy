import React from 'react';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import { Status } from 'api/api';
import EkspanderbarMeny from 'komponenter/header/header-regular/common/ekspanderbar-meny/EkspanderbarMeny';
import Loader from '@navikt/ds-react';
import { HovedmenyKnapp } from 'komponenter/header/header-regular/common/meny-knapp/hovedmeny-knapp/HovedmenyKnapp';
import MobilMeny from './meny/MobilMeny';
import SlideToClose from 'komponenter/header/header-regular/mobil/meny/innhold/utils/SlideToClose';

export const mobilmenyKnappId = 'mobilmeny-knapp-id';
const classname = 'mobilmeny';

const stateSelector = (state: AppState) => ({
    meny: state.menypunkt,
    language: state.language.language,
    arbeidsflate: state.arbeidsflate.status,
    hovedIsOpen: state.dropdownToggles.hovedmeny,
    underIsOpen: state.dropdownToggles.undermeny,
    varselIsOpen: state.dropdownToggles.varsler,
});

export const HovedmenyMobil = () => {
    const { meny, underIsOpen, hovedIsOpen, varselIsOpen } = useSelector(stateSelector);

    return (
        <div className={'media-sm-mobil'}>
            <HovedmenyKnapp id={mobilmenyKnappId} />
            <EkspanderbarMeny isOpen={hovedIsOpen} classname={classname} id={classname}>
                <SlideToClose>
                    {meny.status === Status.OK ? (
                        <MobilMeny classname={classname} />
                    ) : (
                        <Loader
                            tekstId={'meny-loading'}
                            className={hovedIsOpen || underIsOpen || varselIsOpen ? 'spinner-container--active' : ''}
                        />
                    )}
                </SlideToClose>
            </EkspanderbarMeny>
        </div>
    );
};

export default HovedmenyMobil;
