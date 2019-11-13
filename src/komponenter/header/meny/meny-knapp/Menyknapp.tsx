import React from 'react';
import { mobileview } from '../../../../api/api';
import { Undertittel } from 'nav-frontend-typografi';
import BEMHelper from '../../../../utils/bem';
import MediaQuery from 'react-responsive';
import Tekst from '../../../../tekster/finn-tekst';
import HamburgerIkon from '../../../ikoner/meny/HamburgerIkon';
import MenyIkon from '../../../ikoner/mobilmeny/MenyIkon';
import './Menyknapp.less';

interface Props {
    ToggleMenu: () => void;
    clicked: boolean;
}

const Menyknapp = (props: Props) => {
    const cls = BEMHelper('dropdown');
    return (
        <button
            onClick={() => props.ToggleMenu()}
            className={cls.element('menyknapp')}
            aria-label="Menyknapp"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            aria-expanded={props.clicked}
        >
            <div className={cls.element('menyknapp', 'innhold')}>
                <MediaQuery minWidth={mobileview}>
                    <MediaQuery />
                    <HamburgerIkon ikonClass="hamburger-ikon" />
                </MediaQuery>
                <MediaQuery maxWidth={mobileview - 1}>
                    <MenyIkon />
                </MediaQuery>
                <Undertittel>
                    <Tekst id="meny-knapp" />
                </Undertittel>
            </div>
        </button>
    );
};

export default Menyknapp;
