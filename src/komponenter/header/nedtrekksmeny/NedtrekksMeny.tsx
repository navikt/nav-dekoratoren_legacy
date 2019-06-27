import React from 'react';
import LoggInnKnapp from './Logg-inn-knapp';
import Lenke from 'nav-frontend-lenker';
import { Undertittel } from 'nav-frontend-typografi';
import BEMHelper from '../../../utils/bem';
import HamburgerIkon from '../ikoner/HamburgerIkon';
import './Nedtrekksmeny.less';

const cls = BEMHelper('nedtrekksmeny');

interface Props {
    dropDownExpand: () => void;
    clicked: boolean;
}

const NedtrekkMeny: React.FunctionComponent<Props> = props => {
    return (
        <nav>
            <div className={cls.className}>
                <div className={cls.element('venstre')}>
                    <Lenke
                        href="javascript:void(0)"
                        onClick={props.dropDownExpand}
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
                    props.clicked ? 'active' : ''
                )}
                id="dropdownMenu"
            >
                {props.children}
            </div>
        </nav>
    );
};

export default NedtrekkMeny;
