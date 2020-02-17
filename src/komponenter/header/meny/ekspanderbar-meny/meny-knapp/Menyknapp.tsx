import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import BEMHelper from '../../../../../utils/bem';
import { Language } from '../../../../../reducer/language-duck';
import Tekst from '../../../../../tekster/finn-tekst';
import HamburgerIkon from '../../../../../ikoner/meny/HamburgerIkon';
import MenyIkon from '../../../../../ikoner/mobilmeny/MenyIkon';
import './Menyknapp.less';

interface Props {
    ToggleMenu: () => void;
    clicked: boolean;
    lang: Language;
    isMobile: boolean;
}

const Menyknapp = (props: Props) => {
    const cls = BEMHelper('dropdown');
    return (
        <>
            {props.lang !== Language.SAMISK ? (
                <button
                    onClick={() => props.ToggleMenu()}
                    className={cls.element('menyknapp')}
                    id={`decorator-meny-toggleknapp-${props.isMobile ? 'mobil' : 'desktop'}`}
                    aria-label="Menyknapp"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                    aria-expanded={props.clicked}
                >
                    <div className={cls.element('menyknapp', 'innhold')}>
                        <div className="media-sm-mobil menyknapp-mobil">
                            <MenyIkon />
                        </div>
                        <div className="media-tablet-desktop menyknapp-tablet-desktop">
                            <HamburgerIkon ikonClass="hamburger-ikon" />
                        </div>
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
