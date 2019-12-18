import React from 'react';
import { Element } from 'nav-frontend-typografi';
import './Skiplinks.less';

const Skiplinks = () => {
    return (
        <div className="navno-dekorator">
            <div className="hodefot">
                <nav>
                    <a
                        href="#arbeidsflatemeny"
                        className="visuallyhidden focusable"
                    >
                        Gå til hovedmeny
                    </a>
                    <a href="#maincontent" className="visuallyhidden focusable">
                        Gå til hovedinnhold
                    </a>
                    <a href="#sok" className="visuallyhidden focusable">
                        Gå til søk
                    </a>
                </nav>
            </div>
            <div className="dekorator-under-arbeid">
                <Element>
                    OBS! Denne versjonen av header og footer er under arbeid.
                    Kan ikke prodsettes.
                </Element>
            </div>
        </div>
    );
};
export default Skiplinks;
