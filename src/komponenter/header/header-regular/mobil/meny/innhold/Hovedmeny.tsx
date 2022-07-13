import React, { useState } from 'react';
import BEMHelper from 'utils/bem';
import { dataInitState, MenyNode } from 'store/reducers/menu-duck';
import { getHovedmenyNode, getMinsidemenyNode, MenuValue } from 'utils/meny-storage-utils';
import { Locale } from 'store/reducers/language-duck';
import { MobilMenyHeader } from './header/MobilMenyHeader';
import MobilarbeidsflateValg from './elementer/arbeidsflatemeny/MobilarbeidsflateValg';
import { AppState } from 'store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import InnloggetBruker from './elementer/innloggetbruker/InnloggetBruker';
import ForsideLenke from './elementer/ForsideLenke';
import Dittnavmeny from './elementer/dittnavmeny/Dittnavmeny';
import Sok from 'komponenter/header/header-regular/common/sok/Sok';
import { AnalyticsCategory, analyticsEvent } from 'utils/analytics/analytics';
import { toggleUndermenyVisning } from 'store/reducers/dropdown-toggle-duck';
import Listelement from './elementer/Listelement';
import { Next } from '@navikt/ds-icons';

export const mobilSokInputId = `sok-input-small`;

const stateSelector = (state: AppState) => ({
    meny: state.menypunkt,
    language: state.language.language,
    arbeidsflate: state.arbeidsflate.status,
    innloggingsstatus: state.innloggingsstatus,
    hovedMenuIsOpen: state.dropdownToggles.hovedmeny,
    underMenuIsOpen: state.dropdownToggles.undermeny,
    varselIsOpen: state.dropdownToggles.varsler,
});

type Props = {
    settLenker: (meny: MenyNode) => void;
    className: string;
};

export const MobilHovedmeny = (props: Props) => {
    const dispatch = useDispatch();
    const { className, settLenker } = props;
    const menyClass = BEMHelper(className);
    const { language, meny } = useSelector(stateSelector);
    const { arbeidsflate, innloggingsstatus } = useSelector(stateSelector);
    const { underMenuIsOpen, hovedMenuIsOpen } = useSelector(stateSelector);
    const [searchInput, setSearchInput] = useState<string>('');
    const isLanguageNorwegian = language === Locale.BOKMAL || language === Locale.NYNORSK;

    const minsideLenker = getMinsidemenyNode(meny.data, language) || dataInitState;

    const hovedmenyLenker = getHovedmenyNode(meny.data, language, arbeidsflate) || dataInitState;

    const menutoggle = () => {
        analyticsEvent({
            category: AnalyticsCategory.Header,
            action: `meny-${underMenuIsOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleUndermenyVisning());
    };

    const setMenyliste = (event: React.MouseEvent<HTMLAnchorElement>, menyNode: MenyNode) => {
        event.preventDefault();
        menutoggle();
        settLenker(menyNode);
    };

    const containerClassName = menyClass.element('startmeny', underMenuIsOpen || !hovedMenuIsOpen ? 'hidden' : '');

    return (
        <div className={containerClassName}>
            <Sok
                id={mobilSokInputId}
                isOpen={hovedMenuIsOpen}
                dropdownTransitionMs={400}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
            />
            {!searchInput && (
                <>
                    <InnloggetBruker />
                    <ForsideLenke arbeidsflate={arbeidsflate} erInnlogget={innloggingsstatus.data.authenticated} />
                    {innloggingsstatus.data.authenticated && arbeidsflate === MenuValue.PRIVATPERSON && (
                        <div className={menyClass.element('submeny', 'wrap')}>
                            <Dittnavmeny
                                minsideLenker={minsideLenker}
                                className={menyClass.className}
                                openMeny={setMenyliste}
                            />
                        </div>
                    )}
                    <MobilMenyHeader />
                    <ul className={menyClass.element('meny', 'mainlist')}>
                        {arbeidsflate === MenuValue.PRIVATPERSON && isLanguageNorwegian ? (
                            <Listelement className={menyClass.className} classElement={'text-element'}>
                                <a
                                    className={'lenke'}
                                    href={'https://nav.no'}
                                    onClick={(e) => setMenyliste(e, { ...hovedmenyLenker, flatten: true })}
                                >
                                    {'Hva kan vi hjelpe deg med?'}
                                    <Next />
                                </a>
                            </Listelement>
                        ) : (
                            hovedmenyLenker.children.map((menyElement: MenyNode, index: number) => (
                                <Listelement key={index} className={menyClass.className} classElement={'text-element'}>
                                    <a
                                        className={'lenke'}
                                        href={'https://nav.no'}
                                        onClick={(e) => setMenyliste(e, menyElement)}
                                    >
                                        {menyElement.displayName}
                                        <Next />
                                    </a>
                                </Listelement>
                            ))
                        )}
                    </ul>
                    {isLanguageNorwegian && <MobilarbeidsflateValg lang={language} />}
                </>
            )}
        </div>
    );
};
