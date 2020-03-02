import React from 'react';
import { AppState } from '../../../../../reducer/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getMinsideMenuNode, MenuValue } from '../../../../../utils/meny-storage-utils';
import { GACategory, triggerGaEvent } from '../../../../../utils/google-analytics';
import { toggleMinsideMeny } from '../../../../../reducer/dropdown-toggle-duck';
import MenylinjeKnapp from '../../meny-knapper/MenylinjeKnapp';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import Tekst from '../../../../../tekster/finn-tekst';
import MinsideIkon from '../../meny-knapper/minside-ikon/MinsideIkon';
import { Status } from '../../../../../api/api';
import { MenySpinner } from '../meny-spinner/MenySpinner';
import { EkspanderbarMeny } from '../ekspanderbar-meny/EkspanderbarMeny';
import MinsideDropdown from './minside-dropdown/MinsideDropdown';
import BEMHelper from '../../../../../utils/bem';
import './MinsideMenyDesktop.less';

const stateSelector = (state: AppState) => ({
    innloggetStatus: state.innloggingsstatus.data,
    arbeidsflate: state.arbeidsflate.status,
    isOpen: state.dropdownToggles.minside,
    language: state.language.language,
    menyPunkter: state.menypunkt,
});

const classname = 'desktop-minside-meny';

export const MinsideMenyDesktop = () => {
    const { arbeidsflate, innloggetStatus, isOpen, language, menyPunkter } = useSelector(stateSelector);
    const dispatch = useDispatch();

    if (!innloggetStatus.authenticated || arbeidsflate === MenuValue.SAMARBEIDSPARTNER) {
        return null;
    }

    const cls = BEMHelper(classname);

    const toggleMenu = () => {
        triggerGaEvent({
            category: GACategory.Header,
            action: `minside-meny-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleMinsideMeny());
    };

    const knappTekst =
        arbeidsflate === MenuValue.IKKEVALGT ||
        arbeidsflate === MenuValue.PRIVATPERSON
            ? <Tekst id={'person-minside-lenke'} />
            : arbeidsflate === MenuValue.ARBEIDSGIVER
            ? <Tekst id={'arbeidsgiver-minside-lenke'} />
            : '';

    // const lenkeurl =
    //     arbeidsflate === MenuValue.IKKEVALGT ||
    //     arbeidsflate === MenuValue.PRIVATPERSON
    //         ? Environment.DITT_NAV_URL
    //         : arbeidsflate === MenuValue.ARBEIDSGIVER
    //         ? Environment.MINSIDE_ARBEIDSGIVER_URL
    //         : '';

    const knapp = (
        <MenylinjeKnapp
            toggleMenu={toggleMenu}
            isOpen={isOpen}
            parentClassname={classname}
            ariaLabel={'Min side menyknapp'}
        >
            <MinsideIkon isOpen={isOpen} />
            <div className={cls.element('knapp-tekst')}>
                <Normaltekst className={cls.element('knapp-tekst-topp')}>
                    {knappTekst}
                </Normaltekst>
                {
                    arbeidsflate === MenuValue.PRIVATPERSON &&
                    innloggetStatus.authenticated && (
                        <Undertekst className={cls.element('knapp-tekst-bunn')}>
                            {innloggetStatus.name}
                        </Undertekst>
                    )
                }
            </div>
        </MenylinjeKnapp>
    );

    return (
        <EkspanderbarMeny
            isOpen={isOpen}
            menyKnapp={knapp}
            classname={'desktop-dropdown'}
            id={classname}
        >
            {menyPunkter.status === Status.OK ? (
                <MinsideDropdown
                    classname={classname}
                    isOpen={isOpen}
                    menyLenker={getMinsideMenuNode(menyPunkter.data, language)}
                />
            ) : <MenySpinner />}
        </EkspanderbarMeny>
    );
};

export default MinsideMenyDesktop;
