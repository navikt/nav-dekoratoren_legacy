import React from 'react';
import BEMHelper from '../../../utils/bem';
import './nedtrekksmeny.less';
import HamburgerIkon from '../ikoner/HamburgerIkon';
import LoggInnKnapp from './../logg-inn-knapp';
import Lenke from 'nav-frontend-lenker';
import { Undertittel } from 'nav-frontend-typografi';
import HovedSeksjon from './HovedSeksjon';
import MinsideSeksjon from './MinsideSeksjon';

const cls = BEMHelper('nedtrekksmeny');

class NedtrekkMeny extends React.Component {
    state = {
        clicked: false,
    };
    constructor(props: any) {
        super(props);
        this.state = {
            clicked: false,
        };
    }

    dropDownExpand = () => {
        this.setState({
            clicked: !this.state.clicked,
        });
    };
    render = () => {
        return (
            <nav>
                <div className={cls.className}>
                    <div className={cls.element('venstre')}>
                        <Lenke
                            href="javascript:void(0)"
                            onClick={this.dropDownExpand}
                            className={cls.element('menyButton')}
                        >
                            <div className={cls.element('dropdownMenu')}>
                                <HamburgerIkon ikonClass="hamburgerIkon" />
                                <Undertittel>MENY</Undertittel>
                            </div>
                        </Lenke>
                    </div>
                    <div className={cls.element('hoyreMeny')}>
                        <LoggInnKnapp />
                    </div>
                </div>
                <div
                    className={cls.element(
                        'menyvalg',
                        this.state.clicked ? 'active' : ''
                    )}
                    id="dropdownMenu"
                >
                    <HovedSeksjon className={cls.className} />
                    <MinsideSeksjon className={cls.className} />
                </div>
            </nav>
        );
    };
}

export default NedtrekkMeny;
