import React, { useState } from 'react';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import BEMHelper from 'utils/bem';
import { MenyNode } from 'store/reducers/menu-duck';
import { MenuValue } from 'utils/meny-storage-utils';
import { Language } from 'store/reducers/language-duck';
import MenyIngress from './elementer/MenyIngress';
import Undermeny from './elementer/Undermeny';
import Listelement from './elementer/Listelement';
import MobilarbeidsflateValg from '../../arbeidsflatemeny/MobilarbeidsflateValg';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import InnloggetBruker from './elementer/innloggetbruker/InnloggetBruker';
import ForsideLenke from './elementer/ForsideLenke';
import Dittnavmeny from './elementer/dittnavmeny/Dittnavmeny';
import Sok from 'komponenter/header/header-regular/common/sok/Sok';
import './Innhold.less';

interface Props {
    classname: string;
    menyLenker: MenyNode;
    minsideLenker: MenyNode;
    togglemenu: () => void;
    togglehovedmenu: () => void;
    menuIsOpen: boolean;
    underMenuIsOpen: boolean;
    varslerIsOpen: boolean;
    lang: Language;
}

export const mobilSokInputId = `mobil-sok-input`;
const stateSelector = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    innloggingsstatus: state.innloggingsstatus,
});

const Innhold = (props: Props) => {
    const { arbeidsflate, innloggingsstatus } = useSelector(stateSelector);
    const [lenker, settLenker] = useState(props.menyLenker.children[0]);
    const { lang, underMenuIsOpen, minsideLenker } = props;
    const { classname, menyLenker, menuIsOpen } = props;
    const menyClass = BEMHelper(classname);

    const setMenyliste = (
        event: React.MouseEvent<HTMLAnchorElement>,
        meny: MenyNode
    ) => {
        event.preventDefault();
        props.togglemenu();
        settLenker(meny);
    };

    return (
        <div className={menyClass.className}>
            <section
                className={menyClass.element(
                    'startmeny',
                    menuIsOpen && !underMenuIsOpen ? 'active' : ''
                )}
            >
                <Sok
                    isOpen={menuIsOpen}
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
                    {menyLenker.children.map(
                        (menyElement: MenyNode, index: number) => (
                            <Listelement
                                key={index}
                                className={menyClass.className}
                                classElement="text-element"
                            >
                                <a
                                    className="lenke"
                                    href="https://nav.no"
                                    onClick={(e) =>
                                        setMenyliste(e, menyElement)
                                    }
                                >
                                    {menyElement.displayName}
                                    <HoyreChevron />
                                </a>
                            </Listelement>
                        )
                    )}
                </ul>
                {lang === Language.NORSK && (
                    <MobilarbeidsflateValg lang={lang} />
                )}
            </section>
            <Undermeny
                className={menyClass.className}
                undermenyIsOpen={underMenuIsOpen}
                lenker={lenker}
            />
        </div>
    );
};

export default Innhold;
