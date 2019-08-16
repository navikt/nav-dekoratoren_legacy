import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import Cheveron from 'nav-frontend-chevron';

const SprakVelger = () => {
    return (
        <div>
            <ul>
                <li className="dropdown">
                    <a href="javascript:void(0)" className="dropbtn">
                        <Normaltekst>
                            Språk/Languages
                            <Cheveron type="ned" />
                        </Normaltekst>
                    </a>
                    <div className="dropdown-content">
                        <a className="dropvalg," href="#">
                            Bokmål
                        </a>
                        <a className="dropvalg" href="#">
                            Nynorsk
                        </a>
                        <a className="dropvalg" href="#">
                            English
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default SprakVelger;
