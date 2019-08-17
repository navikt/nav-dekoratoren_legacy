import React from 'react';
import LoggInnKnapp from './logginn/Logg-inn-knapp';
import { Undertittel } from 'nav-frontend-typografi';
import BEMHelper from '../../../utils/bem';
import HamburgerIkon from '../../ikoner/meny/HamburgerIkon';
import './hovedmeny.less';
import Sok from './sok/Sok';
import MediaQuery from 'react-responsive';
import NavLogoRod from '../../ikoner/meny/NavLogoRod';
import VarselinnboksProvider from '../../../provider/Varselinnboks-provider';
import Varselbjelle from './varsel/Varselbjelle';
import MinsideLenke from './minside-lenke/MinsideLenke';

const cls = BEMHelper('nedtrekksmeny');

interface Props {
    dropDownExpand: () => void;
    clicked: boolean;
}

const Hovedmeny: React.FunctionComponent<Props> = props => {
    return (
        <nav className={cls.className}>
            <div className={cls.element('content')}>
                <div className={cls.element('meny')}>
                        <NavLogoRod
                            width="88"
                            height="88"
                            classname={cls.element('logo')}
                        />
                    <div className={cls.element('function-components')}>
                        <button
                            onClick={props.dropDownExpand}
                            className={cls.element('menyButton')}
                        >
                            <div className={cls.element('dropdownMenu')}>
                                <HamburgerIkon ikonClass="hamburgerIkon" />
                                <Undertittel>MENY</Undertittel>
                            </div>
                        </button>

                        <MediaQuery minWidth={768}>
                            <Sok />
                        </MediaQuery>
                        <VarselinnboksProvider>
                            <Varselbjelle />
                        </VarselinnboksProvider>
                        <MinsideLenke />
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

export default Hovedmeny;
