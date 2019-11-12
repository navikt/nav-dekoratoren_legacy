import * as React from 'react';
import './Skiplinks.less';

const Skiplinks = () => {
    return (
        <div id="skiplinks">
            <div className="hodefot">
                <nav>
                    <a href="#toppmeny" className="visuallyhidden focusable">
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
        </div>
    );
};
export default Skiplinks;
