import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Undertittel } from 'nav-frontend-typografi';
import LoggInnKnapp from './Logg-inn-knapp';
import VarselinnboksProvider from '../../../provider/Varselinnboks-provider';
import Varselbjelle from './Varselbjelle';
import Sok from './Sok';
import MinsideLenke from './MinsideLenke';
import HamburgerIkon from '../ikoner/HamburgerIkon';
import BEMHelper from '../../../utils/bem';
import MediaQuery from 'react-responsive';
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
                <MediaQuery minWidth={768}>
                    <Sok />
                </MediaQuery>
                <VarselinnboksProvider>
                    <Varselbjelle />
                </VarselinnboksProvider>
                <MinsideLenke/>
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