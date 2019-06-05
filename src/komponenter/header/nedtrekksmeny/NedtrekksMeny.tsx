import React from 'react';
import BEMHelper from '../../../utils/bem';
import './nedtrekksmeny.less';
import HamburgerIkon from '../ikoner/HamburgerIkon';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import LoggInnKnapp from './../logg-inn-knapp';

const cls = BEMHelper('nedtrekksmeny');

class NedtrekkMeny extends React.Component {
    render = () => {
        return (
            <nav className={cls.className}>
                <div className={cls.element('venstre')}>
                    <div className={cls.element('dropdownMenu')}>
                        <HamburgerIkon ikonClass="hamburgerIkon" />
                        <Undertittel>MENY</Undertittel>
                    </div>
                </div>
                <div className={cls.element('hoyreMeny')}>
                    <LoggInnKnapp />
                </div>
            </nav>
        );
    };
}

export default NedtrekkMeny;
