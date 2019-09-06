import React from 'react';
import MediaQuery from 'react-responsive';
import BEMHelper from '../../../utils/bem';
import VarselinnboksProvider from '../../../provider/Varselinnboks-provider';
import InnloggingsstatusProvider from '../../../provider/Innloggingsstatus-provider';
import NavLogoRod from '../../ikoner/meny/NavLogoRod';
import MenyToggleKnapp from './dropdown-meny/Meny-toggle-knapp';
import Sok from './sok/Sok';
import MinsideLenke from './minside-lenke/MinsideLenke';
import Varselbjelle from './varsel/Varselbjelle';
import LoggInnKnapp from './logginn/Logg-inn-knapp';
import './Hovedmeny.less';

const cls = BEMHelper('hovedmeny');

const Hovedmeny = () => {
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

                    <InnloggingsstatusProvider>
                        <>
                            <MinsideLenke />
                            <VarselinnboksProvider>
                                <Varselbjelle />
                            </VarselinnboksProvider>
                            <LoggInnKnapp />
                        </>
                    </InnloggingsstatusProvider>
                </div>
            </div>
        </nav>
    );
};

export default Hovedmeny;
