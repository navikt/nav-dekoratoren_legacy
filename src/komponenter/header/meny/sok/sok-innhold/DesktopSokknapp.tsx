import React from 'react';
import MediaQuery from 'react-responsive';
import Knapp from 'nav-frontend-knapper/lib/knapp';
import Tekst from '../../../../../tekster/finn-tekst';
import { tabletview } from '../../../../../styling-mediaquery';

const DesktopSokknapp = () => {
    return (
        <MediaQuery minWidth={tabletview}>
            <div className="sok-knapp btn">
                <Knapp type="standard" htmlType="submit">
                    <Tekst id="sok-knapp" />
                </Knapp>
            </div>
        </MediaQuery>
    );
};

export default DesktopSokknapp;
