import React from 'react';
import { mobileview } from '../../../../../api/api';
import MediaQuery from 'react-responsive';
import Knapp from 'nav-frontend-knapper/lib/knapp';
import Tekst from '../../../../../tekster/finn-tekst';

const DesktopSokknapp = () => {
    return (
        <MediaQuery minWidth={mobileview}>
            <div className="sok-knapp btn">
                <Knapp type="standard" htmlType="submit">
                    <Tekst id="sok-knapp" />
                </Knapp>
            </div>
        </MediaQuery>
    );
};

export default DesktopSokknapp;
