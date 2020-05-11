import React from 'react';
import { useEffect } from 'react';
import { AppState } from 'store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import EkspanderbarMeny from 'komponenter/header/header-regular/common/ekspanderbar-meny/EkspanderbarMeny';
import Sok from 'komponenter/header/header-regular/common/sok/Sok';
import { toggleSok } from 'store/reducers/dropdown-toggle-duck';
import { Undertittel } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import { GACategory, gaEvent } from 'utils/google-analytics';
import MenylinjeKnapp from 'komponenter/header/header-regular/common/meny-knapper/MenylinjeKnapp';
import SokMenyIkon from 'komponenter/header/header-regular/common/meny-knapper/ikoner/sok-ikon/SokMenyIkon';
import { KbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import './SokDropdown.less';

const stateSelector = (state: AppState) => ({
    isOpen: state.dropdownToggles.sok,
});

const classname = 'desktop-sok-dropdown';
export const desktopSokKnappId = 'desktop-sok-knapp';
export const desktopSokInputId = 'desktop-sok-input';
const dropdownTransitionDuration = 300;

type Props = {
    kbNavMainState: KbNavMain;
};

export const SokDropdown = ({ kbNavMainState }: Props) => {
    const { isOpen } = useSelector(stateSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const dropdownElement = document.getElementById(classname) as HTMLElement;
        if (dropdownElement) {
            if (isOpen) {
                setTimeout(
                    () => (dropdownElement.style.maxHeight = '100rem'),
                    dropdownTransitionDuration,
                );
                document.getElementById(desktopSokInputId)?.focus();
            } else {
                dropdownElement.style.removeProperty('max-height');
                document.getElementById(desktopSokKnappId)?.focus();
            }
        }
    }, [isOpen]);

    const toggleMenu = () => {
        gaEvent({
            category: GACategory.Header,
            action: `sok-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleSok());
    };

    const knapp = (
        <MenylinjeKnapp
            onClick={toggleMenu}
            isOpen={isOpen}
            classname={classname}
            id={desktopSokKnappId}
            ariaLabel={'Søkeknapp'}
        >
            <SokMenyIkon isOpen={isOpen} />
            <Undertittel>
                <Tekst id={'sok-knapp'} />
            </Undertittel>
        </MenylinjeKnapp>
    );

    return (
        <EkspanderbarMeny
            classname={classname}
            id={classname}
            isOpen={isOpen}
            menyKnapp={knapp}
        >
            <Sok tabindex={true} isOpen={isOpen} id={desktopSokInputId} />
        </EkspanderbarMeny>
    );
};
