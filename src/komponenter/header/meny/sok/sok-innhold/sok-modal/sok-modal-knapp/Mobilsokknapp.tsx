import React from 'react';

import {
    mobileview,
    tabletview,
} from '../../../../../../../styling-mediaquery';
import MediaQuery from 'react-responsive';
import SokIkon from '../../../../../../../ikoner/mobilmeny/SokIkon';

const Mobilsokknapp = () => {
    return (
        <MediaQuery maxWidth={tabletview - 1}>
            <span>
                <button className="sok-input-mobil-submit" type="submit">
                    <MediaQuery maxWidth={mobileview - 1}>
                        <SokIkon width="39px" height="39px" color="#99c2e8" />
                    </MediaQuery>
                    <MediaQuery maxWidth={tabletview - 1} minWidth={mobileview}>
                        <SokIkon width="26px" height="26px" color="#000000" />
                    </MediaQuery>
                </button>
            </span>
        </MediaQuery>
    );
};

export default Mobilsokknapp;
