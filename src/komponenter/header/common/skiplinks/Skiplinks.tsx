import React, { useEffect, useState } from 'react';
import { mobilmenyKnappId } from 'komponenter/header/header-regular/mobil/HovedmenyMobil';
import { desktopHovedmenyKnappId } from 'komponenter/header/header-regular/desktop/hovedmeny/Hovedmeny';
import { useDispatch, useSelector } from 'react-redux';
import { toggleHovedmeny, toggleSok, toggleUndermenyVisning } from 'store/reducers/dropdown-toggle-duck';
import { SkipLinkElement, SkipLinkProps } from 'komponenter/header/common/skiplinks/SkiplinkElement';
import { AppState } from 'store/reducers';
import { mobilSokInputId } from 'komponenter/header/header-regular/mobil/meny/innhold/Hovedmeny';
import { desktopSokInputId } from 'komponenter/header/header-regular/desktop/sok-dropdown/SokDropdown';
import { logAmplitudeEvent } from '../../../../utils/analytics/amplitude';
import 'komponenter/header/common/skiplinks/Skiplinks.less';

const stateSelector = (state: AppState) => ({
    mainMenuOpen: state.dropdownToggles.hovedmeny,
    subMenuOpen: state.dropdownToggles.undermeny,
    sokOpen: state.dropdownToggles.sok,
});

const mainContentId = 'maincontent';

type Props = {
    simple?: boolean;
};

const Skiplinks = ({ simple }: Props) => {
    const dispatch = useDispatch();
    const { mainMenuOpen, subMenuOpen, sokOpen } = useSelector(stateSelector);
    const [hasMainContent, setHasMainContent] = useState(false);

    const openMobilSok = () => {
        if (subMenuOpen) {
            dispatch(toggleUndermenyVisning());
        } else if (!mainMenuOpen) {
            dispatch(toggleHovedmeny());
        }
        setTimeout(() => document.getElementById(mobilSokInputId)?.focus(), 100);
    };

    const openDesktopSok = () => {
        if (sokOpen) {
            document.getElementById(desktopSokInputId)?.focus();
        } else {
            dispatch(toggleSok());
        }
    };

    const logSkipLink = (key: string) => {
        logAmplitudeEvent('skiplinks', { kilde: 'header', fritekst: key });
    };

    const skipLinks: SkipLinkProps[] = [
        ...(!simple
            ? [
                  {
                      tekstId: 'skiplinks-ga-til-hovedmeny',
                      onClick: () => document.getElementById(mobilmenyKnappId)?.focus(),
                      className: 'skiplink__mobil',
                  },
                  {
                      tekstId: 'skiplinks-ga-til-sok',
                      onClick: openMobilSok,
                      className: 'skiplink__mobil',
                  },
                  {
                      tekstId: 'skiplinks-ga-til-hovedmeny',
                      onClick: () => document.getElementById(desktopHovedmenyKnappId)?.focus(),
                      className: 'skiplink__desktop',
                  },
                  {
                      tekstId: 'skiplinks-ga-til-sok',
                      onClick: openDesktopSok,
                      className: 'skiplink__desktop',
                  },
              ]
            : []),
        ...(hasMainContent
            ? [
                  {
                      tekstId: 'skiplinks-ga-til-hovedinnhold',
                      onClick: () => {
                          document.getElementById(mainContentId)?.focus();
                      },
                  },
              ]
            : []),
    ];

    useEffect(() => {
        const mainContentElement = document.getElementById(mainContentId);
        setHasMainContent(!!mainContentElement);
    }, []);

    return skipLinks.length > 0 ? (
        <nav id="site-skiplinks" className="site-skiplinks" aria-label="Hopp til innhold">
            <ul>
                {skipLinks.map((link, index) => (
                    <SkipLinkElement
                        tekstId={link.tekstId}
                        onClick={() => {
                            logSkipLink(link.tekstId);
                            link.onClick && link.onClick();
                        }}
                        className={link.className}
                        key={index}
                    />
                ))}
            </ul>
        </nav>
    ) : null;
};

export default Skiplinks;
