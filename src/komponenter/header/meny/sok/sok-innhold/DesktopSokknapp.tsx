import React from 'react';
import Knapp from 'nav-frontend-knapper/lib/knapp';
import Tekst from '../../../../../tekster/finn-tekst';

const DesktopSokknapp = () => {
    return (
        <div className="media-lg-desktop desktop-sokeknapp">
            <div className="sok-knapp btn">
                <Knapp type="standard" htmlType="submit">
                    <Tekst id="sok-knapp" />
                </Knapp>
            </div>
        </div>
    );
};

export default DesktopSokknapp;
