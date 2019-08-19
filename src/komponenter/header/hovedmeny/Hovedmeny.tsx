import React from 'react';
import LoggInnKnapp from './logginn/Logg-inn-knapp';
import MediaQuery from 'react-responsive';
import BEMHelper from '../../../utils/bem';
import Sok from './sok/Sok';
import NavLogoRod from '../../ikoner/meny/NavLogoRod';
import VarselinnboksProvider from '../../../provider/Varselinnboks-provider';
import Varselbjelle from './varsel/Varselbjelle';
import MinsideLenke from './minside-lenke/MinsideLenke';
import MenyToggleKnapp from '../hovedmeny/dropdown-meny/Meny-toggle-knapp';
import './Hovedmeny.less';

const cls = BEMHelper('hovedmeny');

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

                        <MenyToggleKnapp dropdownExpand={props.dropDownExpand}/>

                        <MediaQuery minWidth={768}>
                            <Sok />
                        </MediaQuery>

                        <VarselinnboksProvider>
                            <Varselbjelle />
                        </VarselinnboksProvider>

                        <MinsideLenke />
                        <LoggInnKnapp />

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
