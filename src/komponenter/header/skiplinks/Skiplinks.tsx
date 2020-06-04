import React, { useEffect, useState } from 'react';
import { mobilHovedmenyKnappId } from '../header-regular/mobil/hovedmeny/HovedmenyMobil';
import { desktopHovedmenyKnappId } from '../header-regular/desktop/hovedmeny/HovedmenyDesktop';
import { useDispatch } from 'react-redux';
import { toggleSok } from 'store/reducers/dropdown-toggle-duck';
import { SkipLinkElement } from 'komponenter/header/skiplinks/SkiplinkElement';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import { toggleUndermenyVisning } from 'store/reducers/dropdown-toggle-duck';
import { toggleHovedmeny } from 'store/reducers/dropdown-toggle-duck';
import { mobilSokInputId } from '../header-regular/mobil/hovedmeny/HovedmenyMobil';
import './Skiplinks.less';

export type SkipLink = {
    anchorId?: string;
    tekstId: string;
    onClick?: () => void;
};

const stateSelector = (state: AppState) => ({
    mainMenuOpen: state.dropdownToggles.hovedmeny,
    subMenuOpen: state.dropdownToggles.undermeny,
});

const mainContentId = 'maincontent';

const Skiplinks = () => {
    const dispatch = useDispatch();
    const { mainMenuOpen, subMenuOpen } = useSelector(stateSelector);
    const [hasMainContent, setHasMainContent] = useState(false);

    const toggleMobilSok = () => {
        if (subMenuOpen) {
            dispatch(toggleUndermenyVisning());
        } else if (!mainMenuOpen) {
            dispatch(toggleHovedmeny());
        }
        document.getElementById(mobilSokInputId)?.focus();
    };

    const mobilLinks: SkipLink[] = [
        {
            anchorId: mobilHovedmenyKnappId,
            tekstId: 'skiplinks-ga-til-hovedmeny',
        },
        {
            tekstId: 'skiplinks-ga-til-sok',
            onClick: toggleMobilSok,
        },
    ];

    const desktopLinks: SkipLink[] = [
        {
            anchorId: desktopHovedmenyKnappId,
            tekstId: 'skiplinks-ga-til-hovedmeny',
        },
        {
            tekstId: 'skiplinks-ga-til-sok',
            onClick: () => dispatch(toggleSok()),
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
