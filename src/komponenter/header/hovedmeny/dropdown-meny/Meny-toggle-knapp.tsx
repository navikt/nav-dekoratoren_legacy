import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import HamburgerIkon from '../../../ikoner/meny/HamburgerIkon';
import './Meny-toggle-knapp.less';

interface Props {
    dropdownExpand: () => void;
}

const MenyToggleKnapp = (props: Props) => {
        return (
            <button
                onClick={props.dropdownExpand}
                className="meny-button"
            >
                <div className="button-content">
                    <HamburgerIkon ikonClass="hamburger-ikon" />
                    <Undertittel>MENY</Undertittel>
                </div>
            </button>
        );
};

export default MenyToggleKnapp;
