import React from 'react';

import { mobileview } from '../../../../../api/api';
import MediaQuery from 'react-responsive';
import SokIkon from '../../../../ikoner/mobilmeny/SokIkon';

const Mobilsokknapp = () => {
    return (
        <MediaQuery maxWidth={mobileview - 1}>
            <span>
                <button className="sok-input-mobil-submit" type="submit">
                    <SokIkon width="39px" height="39px" color="#99c2e8" />
                </button>
            </span>
        </MediaQuery>
    );
};

export default Mobilsokknapp;
