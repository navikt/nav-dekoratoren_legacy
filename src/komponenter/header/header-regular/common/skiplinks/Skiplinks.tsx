import React, { useEffect, useState } from 'react';
import { mobilmenyKnappId } from 'komponenter/header/header-regular/mobil/hovedmeny/HovedmenyMobil';
import { desktopHovedmenyKnappId } from 'komponenter/header/header-regular/desktop/hovedmeny/HovedmenyDesktop';
import { useDispatch } from 'react-redux';
import { toggleSok } from 'store/reducers/dropdown-toggle-duck';
import { SkipLinkElement } from './SkiplinkElement';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import { toggleUndermenyVisning } from 'store/reducers/dropdown-toggle-duck';
import { toggleHovedmeny } from 'store/reducers/dropdown-toggle-duck';
import { mobilSokInputId } from 'komponenter/header/header-regular/mobil/hovedmeny/meny-dropdown/MobilVisningsmeny';
import { desktopSokInputId } from 'komponenter/header/header-regular/desktop/sok-dropdown/SokDropdown';
import './Skiplinks.less';

export type SkipLink = {
    anchorId?: string;
    tekstId: string;
    onClick?: () => void;
};

const stateSelector = (state: AppState) => ({
    mainMenuOpen: state.dropdownToggles.hovedmeny,
    subMenuOpen: state.dropdownToggles.undermeny,
    sokOpen: state.dropdownToggles.sok,
});

const mainContentId = 'maincontent';

const Skiplinks = () => {
    const dispatch = useDispatch();
    const { mainMenuOpen, subMenuOpen, sokOpen } = useSelector(stateSelector);
    const [hasMainContent, setHasMainContent] = useState(false);

    const openMobilSok = () => {
        if (subMenuOpen) {
            dispatch(toggleUndermenyVisning());
        } else if (!mainMenuOpen) {
            dispatch(toggleHovedmeny());
        }
        setTimeout(
            () => document.getElementById(mobilSokInputId)?.focus(),
            100
        );
    };

    const openDesktopSok = () => {
        if (sokOpen) {
            document.getElementById(desktopSokInputId)?.focus();
        } else {
            dispatch(toggleSok());
        }
    };

    const mobilLinks: SkipLink[] = [
        {
            tekstId: 'skiplinks-ga-til-hovedmeny',
            onClick: () => document.getElementById(mobilmenyKnappId)?.focus(),
        },
        {
            tekstId: 'skiplinks-ga-til-sok',
            onClick: openMobilSok,
        },
    ];

    const desktopLinks: SkipLink[] = [
        {
            tekstId: 'skiplinks-ga-til-hovedmeny',
            onClick: () =>
                document.getElementById(desktopHovedmenyKnappId)?.focus(),
        },
        {
            tekstId: 'skiplinks-ga-til-sok',
            onClick: openDesktopSok,
        },
    ];

    useEffect(() => {
        const mainContentElement = document.getElementById(mainContentId);
        setHasMainContent(!!mainContentElement);
    }, []);

    return (
        <nav
            id="site-skiplinks"
            className="site-skiplinks"
            aria-label="Hopp til innhold"
        >
            <ul>
                {mobilLinks.map((link, index) => (
                    <SkipLinkElement
                        link={link}
                        className={'skiplink__mobil'}
                        key={index}
                    />
                ))}
                {desktopLinks.map((link, index) => (
                    <SkipLinkElement
                        link={link}
                        className={'skiplink__desktop'}
                        key={index}
                    />
                ))}
                {hasMainContent && (
                    <SkipLinkElement
                        link={{
                            anchorId: mainContentId,
                            tekstId: 'skiplinks-ga-til-hovedinnhold',
                        }}
                    />
                )}
            </ul>
        </nav>
    );
};

export default Skiplinks;
