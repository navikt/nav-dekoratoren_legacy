import React from 'react';
import MediaQuery from 'react-responsive';
import { mobileview } from '../../../../styling-mediaquery';
import { Undertittel } from 'nav-frontend-typografi';
import BEMHelper from '../../../../utils/bem';
import { Language } from '../../../../reducer/language-duck';
import Tekst from '../../../../tekster/finn-tekst';
import HamburgerIkon from '../../../../ikoner/meny/HamburgerIkon';
import MenyIkon from '../../../../ikoner/mobilmeny/MenyIkon';
import './Menyknapp.less';

interface Props {
    ToggleMenu: () => void;
    clicked: boolean;
    lang: Language;
}

const Menyknapp = (props: Props) => {
    const cls = BEMHelper('dropdown');
    return (
        <>
            {props.lang !== Language.SAMISK ? (
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
            ) : null}
        </>
    );
};

export default Menyknapp;
