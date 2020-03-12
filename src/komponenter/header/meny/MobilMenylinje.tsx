import React, { useEffect, useState } from 'react';
import BEMHelper from '../../../utils/bem';
import InnloggingsstatusProvider from '../../../provider/Innloggingsstatus-provider';
import NavLogoRod from '../../../ikoner/meny/NavLogoRod';
import HovedmenyMobil from './ekspanderende-menyer/hovedmeny-mobil/HovedmenyMobil';
import LoggInnKnapp from './logginn/Logg-inn-knapp';
import './MobilMenylinje.less';
import { verifyWindowObj } from '../../../utils/Environment';
import { Language } from '../../../reducer/language-duck';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../reducer/reducer';
import VarselinnboksProvider from '../../../provider/Varselinnboks-provider';
import Varselbjelle from './varsel/Varselbjelle';
import { toggleVarselVisning } from '../../../reducer/dropdown-toggle-duck';

const mobilClass = BEMHelper('mobilmeny');

interface Props {
    language: Language;
}
const stateSelector = (state: AppState) => ({
    innloggingsstatus: state.innloggingsstatus,
    visVarsel: state.dropdownToggles.varsel,
});

const MobilMenylinje = ({ language }: Props) => {
    const dispatch = useDispatch();
    const { innloggingsstatus, visVarsel } = useSelector(stateSelector);
    const [navIkonSize, setNavIkonSize] = useState<string>('66');

    useEffect(() => {
        if (verifyWindowObj()) {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const handleResize = () => {
        window.innerWidth <= 400 ? setNavIkonSize('66') : setNavIkonSize('66');
    };

    const LukkVarsel = ({ clicked }: { clicked: boolean }) => {
        return <>{!clicked && visVarsel && dispatch(toggleVarselVisning())}</>;
    };

    return (
        <nav className={mobilClass.className} aria-label="Hovedmeny">
            <div className={mobilClass.element('content')}>
                <div className={mobilClass.element('elementer')}>
                    <div className={mobilClass.element('venstre-kolonne')}>
                        <NavLogoRod
                            width={navIkonSize}
                            height={navIkonSize}
                            classname={mobilClass.element('logo')}
                        />
                    </div>
                    <div className={mobilClass.element('hoyre-kolonne')}>
                        {!innloggingsstatus.data.authenticated ? (
                            <InnloggingsstatusProvider>
                                <LoggInnKnapp />
                            </InnloggingsstatusProvider>
                        ) : (
                            <>
                                <VarselinnboksProvider>
                                    <Varselbjelle tabindex={true}>
                                        {clicked =>
                                            clicked && (
                                                <LukkVarsel clicked={clicked} />
                                            )
                                        }
                                    </Varselbjelle>
                                </VarselinnboksProvider>
                            </>
                        )}
                        {language === Language.NORSK ||
                        language === Language.ENGELSK ? (
                            <HovedmenyMobil />
                        ) : null}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MobilMenylinje;
