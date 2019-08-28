import React from 'react';
import { AppState } from '../../../reducer/reducer';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import BEMHelper from '../../../utils/bem';
import NavLogoRod from '../../ikoner/meny/NavLogoRod';
import VarselinnboksProvider from '../../../provider/Varselinnboks-provider';
import MenyToggleKnapp from './dropdown-meny/Meny-toggle-knapp';
import Sok from './sok/Sok';
import Varselbjelle from './varsel/Varselbjelle';
import MinsideLenke from './minside-lenke/MinsideLenke';
import LoggInnKnapp from './logginn/Logg-inn-knapp';
import './Hovedmeny.less';

const cls = BEMHelper('hovedmeny');

interface StateProps {
    erInnlogget: boolean;
}

const Hovedmeny = (props: StateProps) => {
    return (
        <nav className={cls.className}>
            <div className={cls.element('content')}>
                <div className={cls.element('meny-elementer')}>
                    <NavLogoRod
                        width="88"
                        height="88"
                        classname={cls.element('logo')}
                    />

                    <MenyToggleKnapp classname="hovedmeny" />

                    <MediaQuery minWidth={768}>
                        <Sok />
                    </MediaQuery>

                    {props.erInnlogget && <MinsideLenke />}

                    <VarselinnboksProvider>
                        <Varselbjelle />
                    </VarselinnboksProvider>

                    <LoggInnKnapp />
                </div>
            </div>
        </nav>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    erInnlogget: state.innloggingsstatus.data.authenticated,
});

export default connect(mapStateToProps)(Hovedmeny);
