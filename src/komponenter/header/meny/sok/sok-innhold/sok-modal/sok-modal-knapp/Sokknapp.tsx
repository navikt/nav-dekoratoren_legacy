import React from 'react';
import SokIkon from '../../../../../../../ikoner/mobilmeny/SokIkon';

const Sokknapp = () => {
    return (
        <button
            className="sok-input-mobil-submit sok-ikon media-mobil-tablet"
            type="submit"
        >
            <div className="media-sm-mobil">
                <SokIkon width="39px" height="39px" color="#0067C5" />
            </div>
            <div className="media-md-tablet">
                <SokIkon width="26px" height="26px" color="#000000" />
            </div>
        </button>
    );
};

export default Sokknapp;
