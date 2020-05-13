import React, { useEffect, useState } from 'react';
import Tekst from 'tekster/finn-tekst';
import { mobilviewMax } from '../../../styling-mediaquery';
import { matchMedia } from 'utils/match-media-polyfill';
import { mobilHovedmenyKnappId } from '../header-regular/mobil/hovedmeny/HovedmenyMobil';
import { desktopHovedmenyKnappId } from '../header-regular/desktop/hovedmeny/HovedmenyDesktop';
import './Skiplinks.less';
import { useDispatch } from 'react-redux';
import { toggleSok } from 'store/reducers/dropdown-toggle-duck';

const Skiplinks = () => {
    const [soklink, setSoklink] = useState<string>('');
    const [hovedmenylink, setHovedmenylink] = useState<string>('');
    const [isMobile, setIsMobile] = useState<boolean>();
    const dispatch = useDispatch();

    const mqlMobilMax = matchMedia(`(max-width: ${mobilviewMax}px)`);

    useEffect(() => {
        setIsMobile(window.innerWidth <= mobilviewMax);
        mqlMobilMax.addEventListener('change', handleResize);
        return () => {
            mqlMobilMax.removeEventListener('change', handleResize);
        };
    }, []);

    useEffect(() => {
        const hovedmenyKnappId = isMobile
            ? mobilHovedmenyKnappId
            : desktopHovedmenyKnappId;
        setHovedmenylink(`#${hovedmenyKnappId}`);

        const idSokLink = isMobile
            ? 'mobil-decorator-sok-toggle'
            : '';
        setSoklink(`#${idSokLink}`);
    }, [isMobile]);

    const handleResize = (event: MediaQueryListEvent) => {
        setIsMobile(event.matches);
    };

    return (
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
                        onClick={() => !isMobile && dispatch(toggleSok())}
                    >
                        <Tekst id="skiplinks-ga-til-sok" />
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Skiplinks;
