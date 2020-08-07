import React from 'react';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import { Status } from 'api/api';
import EkspanderbarMeny from 'komponenter/header/header-regular/common/ekspanderbar-meny/EkspanderbarMeny';
import Spinner from 'komponenter/header/header-regular/common/spinner/Spinner';
import { HovedmenyKnapp } from 'komponenter/header/header-regular/common/meny-knapp/hovedmeny-knapp/HovedmenyKnapp';
import MobilMeny from './meny/MobilMeny';

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

export const MobilHeader = () => {
    const { meny, underIsOpen, hovedIsOpen, varselIsOpen } = useSelector(
        stateSelector
    );

    return (
        <div className={'media-sm-mobil'}>
            <HovedmenyKnapp id={mobilmenyKnappId} />
            <EkspanderbarMeny
                isOpen={hovedIsOpen}
                classname={classname}
                id={classname}
            >
                {meny.status === Status.OK ? (
                    <MobilMeny classname={classname} />
                ) : (
                    <Spinner
                        tekstId={'meny-loading'}
                        className={
                            hovedIsOpen || underIsOpen || varselIsOpen
                                ? 'spinner-container--active'
                                : ''
                        }
                    />
                )}
            </EkspanderbarMeny>
        </div>
    );
};

export default MobilHeader;
