import React, { useEffect, useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import Tekst from '../../../tekster/finn-tekst';
import { mobilviewMax } from '../../../styling-mediaquery';
import './Skiplinks.less';
import { matchMedia } from '../../../utils/match-media-polyfill';
import BEMHelper from '../../../utils/bem';
import { hovedmenyDesktopClassname } from '../meny/ekspanderende-menyer/hovedmeny-desktop/HovedmenyDesktop';
import { hovedmenyMobilClassname } from '../meny/ekspanderende-menyer/hovedmeny-mobil/HovedmenyMobil';

const Skiplinks = () => {
    const [soklink, setSoklink] = useState<string>('');
    const [hovedmenylink, setHovedmenylink] = useState<string>('');

    const mqlMobilMax = matchMedia(`(max-width: ${mobilviewMax}px)`);

    useEffect(() => {
        setSkiplinks(window.innerWidth <= mobilviewMax);
        mqlMobilMax.addEventListener('change', handleResize);
        return () => {
            mqlMobilMax.removeEventListener('change', handleResize);
        };
    }, []);

    const setSkiplinks = (isMobile: boolean) => {
        const idHovedmenyLink = BEMHelper(
            isMobile ? hovedmenyMobilClassname : hovedmenyDesktopClassname
        ).element('menyknapp');
        setHovedmenylink(`#${idHovedmenyLink}`);

        // TODO: oppdater for ny søk-knapp/dropdown funksjonalitet
        const idSokLink = isMobile
            ? 'mobil-decorator-sok-toggle'
            : 'desktop-decorator-sok-input';
        setSoklink(`#${idSokLink}`);
    };

    const handleResize = (event: MediaQueryListEvent) => {
        setSkiplinks(event.matches);
    };

    return (
        <>
            <nav
                id="site-skiplinks"
                className="site-skiplinks"
                aria-label="Hopp til innhold"
            >
                <ul>
                    <li>
                        <a
                            href={hovedmenylink}
                            className="visuallyhidden focusable"
                            id="hovedmenylenke"
                        >
                            <Tekst id="skiplinks-ga-til-hovedmeny" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="#maincontent"
                            className="visuallyhidden focusable"
                            id="hovedinnholdlenke"
                        >
                            <Tekst id="skiplinks-ga-til-hovedinnhold" />
                        </a>
                    </li>
                    <li>
                        <a
                            href={soklink}
                            className="visuallyhidden focusable"
                            id="soklenke"
                        >
                            <Tekst id="skiplinks-ga-til-sok" />
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="dekorator-under-arbeid">
                <Element>
                    OBS! Denne versjonen av header og footer er under arbeid.
                    Kan ikke prodsettes.
                </Element>
            </div>
        </>
    );
};

export default Skiplinks;
