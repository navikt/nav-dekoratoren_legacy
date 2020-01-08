import React from 'react';
import { Element } from 'nav-frontend-typografi';
import './Skiplinks.less';

const Skiplinks = () => {
    return (
        <>
            <nav id="decorator-skiplinks">
                <a
                    href="#arbeidsflatemeny"
                    className="visuallyhidden focusable"
                    id="hovedmenylenke"
                >
                    Gå til hovedmeny
                </a>
                <a
                    href="#maincontent"
                    className="visuallyhidden focusable"
                    id="hovedinnholdlenke"
                >
                    Gå til hovedinnhold
                </a>
                <a
                    href="#sok"
                    className="visuallyhidden focusable"
                    id="soklenke"
                >
                    Gå til søk
                </a>
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
