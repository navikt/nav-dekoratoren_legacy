import React from 'react';
import LoggInnKnapp from './Logg-inn-knapp';
import Lenke from 'nav-frontend-lenker';
import { Undertittel } from 'nav-frontend-typografi';
import BEMHelper from '../../../utils/bem';
import HamburgerIkon from '../ikoner/HamburgerIkon';
import './hovedMeny.less';
import Sok from './Sok';
import MediaQuery from 'react-responsive';
import NavLogoRod from '../ikoner/NavLogoRod';

const cls = BEMHelper('nedtrekksmeny');

interface Props {
    dropDownExpand: () => void;
    clicked: boolean;
}

const HovedMeny: React.FunctionComponent<Props> = props => {
    return (
        <nav className={cls.className}>
            <div className={cls.element('content')}>
                <div className={cls.element('meny')}>
                    <Lenke className="navbar-brand" href="javascript:void(0)">
                        <NavLogoRod
                            width="88"
                            height="88"
                            classname={cls.element('logo')}
                        />
                    </Lenke>
                    <div className={cls.element('function-components')}>
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

                        <MediaQuery minWidth={768}>
                            <Sok />
                        </MediaQuery>
                        <div className={cls.element('hoyreMeny')}>
                            <LoggInnKnapp />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cls.element('wrapper')}>
                <div
                    className={cls.element(
                        'menyvalg',
                        props.clicked ? 'active' : ''
                    )}
                    id="dropdownMenu"
                >
                    {props.children}
                </div>
            </div>
        </nav>
    );
};

export default HovedMeny;
