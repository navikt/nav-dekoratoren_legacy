import BEMHelper from 'utils/bem';
import { minsideDropdownClassname } from 'komponenter/header/header-regular/desktop/minside-meny/MinsideMeny';
import { gaEvent } from 'utils/google-analytics';
import { GACategory } from 'utils/google-analytics';
import { toggleMinsideMeny } from 'store/reducers/dropdown-toggle-duck';
import MenylinjeKnapp from 'komponenter/header/header-regular/common/knapper/MenylinjeKnapp';
import MinsideIkon from 'komponenter/header/header-regular/common/knapper/ikoner/minside-ikon/MinsideIkon';
import Tekst from 'tekster/finn-tekst';
import React from 'react';
import { desktopMinsideKnappId } from 'komponenter/header/header-regular/common/knapper/minside-knapper/MinsideKnapp';
import { AppState } from 'store/reducers';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { MenuValue } from 'utils/meny-storage-utils';

const stateSelector = (state: AppState) => ({
    brukernavn: state.innloggingsstatus.data.name,
    isOpen: state.dropdownToggles.minside,
});

export const MinsidePersonKnapp = () => {
    const dispatch = useDispatch();
    const { isOpen, brukernavn } = useSelector(stateSelector);

    const cls = BEMHelper(minsideDropdownClassname);

    const toggleMinSideDropdown = () => {
        gaEvent({
            context: MenuValue.PRIVATPERSON,
            category: GACategory.Header,
            action: `minside-meny-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleMinsideMeny());
    };

    return (
        <MenylinjeKnapp
            onClick={toggleMinSideDropdown}
            isOpen={isOpen}
            ariaControls={minsideDropdownClassname}
            classname={minsideDropdownClassname}
            id={desktopMinsideKnappId}
        >
            <MinsideIkon isOpen={isOpen} hasMenu={true} />
            <div className={cls.element('knapp-tekst')}>
                <div
                    className={`${cls.element('knapp-tekst-topp')} ${
                        isOpen ? cls.element('knapp-tekst-topp', 'open') : ''
                    }`}
                >
                    <Tekst id={'person-minside-lenke'} />
                </div>
                <div
                    className={`${cls.element('knapp-tekst-bunn')} ${
                        isOpen ? cls.element('knapp-tekst-bunn', 'open') : ''
                    }`}
                >
                    {brukernavn?.toLowerCase() || ''}
                </div>
            </div>
        </MenylinjeKnapp>
    );
};
