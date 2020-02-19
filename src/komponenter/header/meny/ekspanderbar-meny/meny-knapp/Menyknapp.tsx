import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import BEMHelper from '../../../../../utils/bem';
import { Language } from '../../../../../reducer/language-duck';
import Tekst from '../../../../../tekster/finn-tekst';
import HamburgerKnapp from './hamburger-knapp/HamburgerKnapp';
import MenyIkon from '../../../../../ikoner/mobilmeny/MenyIkon';
import './Menyknapp.less';

interface Props {
    ToggleMenu: () => void;
    clicked: boolean;
    lang: Language;
}

const Menyknapp = (props: Props) => {
    const { ToggleMenu, clicked, lang } = props;
    const cls = BEMHelper('dropdown');
    return (
        <>
            {lang !== Language.SAMISK ? (
                <button
                    onClick={() => ToggleMenu()}
                    className={cls.element('menyknapp')}
                    id="decorator-meny-toggleknapp"
                    aria-label="Menyknapp"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                    aria-expanded={clicked}
                >
                    <div className={cls.element('menyknapp-visning')}>
                        <div className="media-sm-mobil menyknapp-mobil">
                            <MenyIkon />
                        </div>
                        <div className={`media-md-tablet menyknapp-tablet-desktop ${cls.element('hamburger-knapp')}`}>
                            <HamburgerKnapp isOpen={clicked}/>
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
