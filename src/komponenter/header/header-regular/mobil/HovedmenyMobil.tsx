import React from 'react';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import { Status } from 'api/api';
import EkspanderbarMeny from 'komponenter/header/header-regular/common/ekspanderbar-meny/EkspanderbarMeny';
import Spinner from 'komponenter/header/header-regular/common/spinner/Spinner';
import { HovedmenyKnapp } from 'komponenter/header/header-regular/common/meny-knapp/hovedmeny-knapp/HovedmenyKnapp';
import { MobilMeny } from './meny/MobilMeny';
import SlideToClose from 'komponenter/header/header-regular/mobil/meny/innhold/utils/SlideToClose';

export const mobilmenyKnappId = 'mobilmeny-knapp-id';
const classname = 'mobilmeny';
const menuId = 'mobilmeny';

const stateSelector = (state: AppState) => ({
    meny: state.menypunkt,
    language: state.language.language,
    arbeidsflate: state.arbeidsflate.status,
    hovedIsOpen: state.dropdownToggles.hovedmeny,
});

export const HovedmenyMobil = () => {
    const { meny, hovedIsOpen } = useSelector(stateSelector);

    return (
        <div className={'media-sm-mobil'}>
            <div className="mobilmenyKnapp">
                <HovedmenyKnapp id={mobilmenyKnappId} menuId={menuId} />
            </div>
            <EkspanderbarMeny isOpen={hovedIsOpen} classname={classname} id={menuId}>
                <SlideToClose>
                    {meny.status === Status.OK ? (
                        <MobilMeny classname={classname} />
                    ) : (
                        <Spinner tekstId={'meny-loading'} />
                    )}
                </SlideToClose>
            </EkspanderbarMeny>
        </div>
    );
};

export default HovedmenyMobil;
