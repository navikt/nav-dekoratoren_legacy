import React from 'react';
import SokIkon from '../../../../../../../ikoner/mobilmeny/SokIkon';

const Mobilsokknapp = () => {
    return (
        <div className="media-mobil-tablet sok-ikon">
            <span>
                <button className="sok-input-mobil-submit" type="submit">
                    <div className="media-sm-mobil">
                        <SokIkon width="39px" height="39px" color="#99c2e8" />
                    </div>
                    <div className="media-md-tablet">
                        <SokIkon width="26px" height="26px" color="#000000" />
                    </div>
                </button>
            </span>
        </div>
    );
};

export default Mobilsokknapp;
