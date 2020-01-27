import React, { useEffect, useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import { desktopview, tabletview } from '../../../styling-mediaquery';
import Tekst from '../../../tekster/finn-tekst';
import { verifyWindowObj } from '../../../utils/Environment';
import './Skiplinks.less';

const Skiplinks = () => {
    const [width, setWidth] = useState<number>(
        verifyWindowObj() ? window.innerWidth : 0
    );

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [width]);

    const handleResize = () => {
        setWidth(window.innerWidth);
    };

    const erDesktop = (): boolean => {
        return width >= desktopview;
    };

    const erMobil = (): boolean => {
        return width < tabletview;
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
                            href={
                                erDesktop()
                                    ? '#decorator-arbeidsflatemeny'
                                    : '#decorator-meny-toggleknapp'
                            }
                            className="visuallyhidden focusable"
                        >
                            <Tekst id="skiplinks-ga-til-hovedmeny" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="#maincontent"
                            className="visuallyhidden focusable"
                        >
                            <Tekst id="skiplinks-ga-til-hovedinnhold" />
                        </a>
                    </li>
                    <li>
                        <a
                            href={
                                erMobil()
                                    ? '#decorator-sok-toggle'
                                    : '#decorator-sok'
                            }
                            className="visuallyhidden focusable"
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
