import React, { useEffect, useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import Tekst from '../../../tekster/finn-tekst';
import { desktopview, tabletview } from '../../../styling-mediaquery';
import './Skiplinks.less';

const Skiplinks = () => {
    const [width, setWidth] = useState<number>(desktopview);
    const [soklink, setSoklink] = useState<string>('#decorator-sok');
    const [hovedmenylink, setHovedmenylink] = useState<string>(
        '#decorator-arbeidsflatemeny'
    );

    useEffect(() => {
        setSkiplinks();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [width]);

    const setSkiplinks = () => {
        setHovedmenylink(
            window.innerWidth >= desktopview
                ? '#decorator-arbeidsflatemeny'
                : '#decorator-meny-toggleknapp'
        );
        setSoklink(
            window.innerWidth < tabletview
                ? '#decorator-sok-toggle'
                : '#decorator-sok'
        );
    };

    const handleResize = () => {
        setWidth(window.innerWidth);
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
                        <a href={soklink} className="visuallyhidden focusable">
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
