import React from 'react';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import BEMHelper from 'utils/bem';
import { MenyNode } from 'store/reducers/menu-duck';
import { getHovedmenyNode } from 'utils/meny-storage-utils';
import { getMinsidemenyNode, MenuValue } from 'utils/meny-storage-utils';
import { Language } from 'store/reducers/language-duck';
import MenyIngress from './elementer/MenyIngress';
import Listelement from './elementer/Listelement';
import MobilarbeidsflateValg from './elementer/arbeidsflatemeny/MobilarbeidsflateValg';
import { AppState } from 'store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import InnloggetBruker from './elementer/innloggetbruker/InnloggetBruker';
import ForsideLenke from './elementer/ForsideLenke';
import Dittnavmeny from './elementer/dittnavmeny/Dittnavmeny';
import Sok from 'komponenter/header/header-regular/common/sok/Sok';
import { dataInitState } from 'store/reducers/menu-duck';
import { GACategory, gaEvent } from 'utils/google-analytics';
import { toggleUndermenyVisning } from 'store/reducers/dropdown-toggle-duck';

interface Props {
    settLenker: (meny: MenyNode) => void;
    className: string;
}

export const mobilSokInputId = `mobil-sok-input`;
const stateSelector = (state: AppState) => ({
    meny: state.menypunkt,
    language: state.language.language,
    arbeidsflate: state.arbeidsflate.status,
    innloggingsstatus: state.innloggingsstatus,
    hovedMenuIsOpen: state.dropdownToggles.hovedmeny,
    underMenuIsOpen: state.dropdownToggles.undermeny,
    varselIsOpen: state.dropdownToggles.varsler,
});

const Hovedmeny = (props: Props) => {
    const dispatch = useDispatch();
    const { className, settLenker } = props;
    const menyClass = BEMHelper(className);
    const { language, meny } = useSelector(stateSelector);
    const { arbeidsflate, innloggingsstatus } = useSelector(stateSelector);
    const { underMenuIsOpen, hovedMenuIsOpen } = useSelector(stateSelector);

    const minsideLenker =
        getMinsidemenyNode(meny.data, language) || dataInitState;

    const hovedmenyLenker =
        getHovedmenyNode(meny.data, language, arbeidsflate) || dataInitState;

    const menutoggle = () => {
        gaEvent({
            category: GACategory.Header,
            action: `meny-${underMenuIsOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleUndermenyVisning());
    };

    const setMenyliste = (
        event: React.MouseEvent<HTMLAnchorElement>,
        meny: MenyNode
    ) => {
        event.preventDefault();
        menutoggle();
        settLenker(meny);
    };

    const containerClassName = menyClass.element(
        'startmeny',
        underMenuIsOpen ? 'hidden' : ''
    );

    return (
        <div className={containerClassName}>
            <Sok
                isOpen={hovedMenuIsOpen}
                dropdownTransitionMs={400}
                id={mobilSokInputId}
            />
            <InnloggetBruker />
            <ForsideLenke
                arbeidsflate={arbeidsflate}
                erInnlogget={innloggingsstatus.data.authenticated}
            />
            {innloggingsstatus.data.authenticated &&
                arbeidsflate === MenuValue.PRIVATPERSON && (
                    <div className={menyClass.element('submeny', 'wrap')}>
                        <Dittnavmeny
                            minsideLenker={minsideLenker}
                            className={menyClass.className}
                            openMeny={setMenyliste}
                        />
                    </div>
                )}
            <MenyIngress
                className={menyClass.element('meny', 'ingress')}
                inputext={arbeidsflate}
            />
            <ul className={menyClass.element('meny', 'mainlist')}>
                {hovedmenyLenker.children.map(
                    (menyElement: MenyNode, index: number) => (
                        <Listelement
                            key={index}
                            className={menyClass.className}
                            classElement="text-element"
                        >
                            <a
                                className="lenke"
                                href="https://nav.no"
                                onClick={(e) => setMenyliste(e, menyElement)}
                            >
                                {menyElement.displayName}
                                <HoyreChevron />
                            </a>
                        </Listelement>
                    )
                )}
            </ul>
            {language === Language.NORSK && (
                <MobilarbeidsflateValg lang={language} />
            )}
        </div>
    );
};

export default Hovedmeny;
