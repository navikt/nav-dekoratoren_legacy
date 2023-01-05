import React, { useState } from 'react';
import BEMHelper from 'utils/bem';
import { dataInitState, MenyNode } from 'store/reducers/menu-duck';
import { getHovedmenyNode, getMinsidemenyNode, MenuValue } from 'utils/meny-storage-utils';
import { Locale } from 'store/reducers/language-duck';
import { MobilHovedmenyHeader } from './header/MobilHovedmenyHeader';
import { MobilArbeidsflateValg } from './arbeidsflatevalg/MobilArbeidsflateValg';
import { AppState } from 'store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { MobilInnloggetBruker } from './innlogget/MobilInnloggetBruker';
import { DittNavMeny } from './innlogget/DittNavMeny';
import Sok from 'komponenter/header/header-regular/common/sok/Sok';
import { AnalyticsCategory, analyticsEvent } from 'utils/analytics/analytics';
import { toggleUndermenyVisning } from 'store/reducers/dropdown-toggle-duck';
import { MobilHovedmenyInnholdPrivat } from './MobilHovedmenyInnholdPrivat';
import classNames from 'classnames';
import { MobilMenypunkt } from './menypunkt/MobilMenypunkt';
import { UnstyledList } from '../utils/UnstyledList';

import 'komponenter/header/header-regular/mobil/meny/innhold/hovedmeny/MobilHovedmenyInnhold.scss';

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

export const MobilHovedmenyInnhold = (props: Props) => {
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

    const setUndermenyLenker = (menyNode: MenyNode) => {
        analyticsEvent({
            category: AnalyticsCategory.Header,
            action: `meny-${underMenuIsOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleUndermenyVisning());
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
            <div className={classNames('mobilHovedmenyInnhold', !!searchInput && 'hiddenBySearch')}>
                <MobilInnloggetBruker />
                {innloggingsstatus.data.authenticated && arbeidsflate === MenuValue.PRIVATPERSON && (
                    <DittNavMeny minsideLenker={minsideLenker} setUnderMeny={setUndermenyLenker} />
                )}
                {arbeidsflate !== MenuValue.PRIVATPERSON && <MobilHovedmenyHeader />}
                {arbeidsflate === MenuValue.PRIVATPERSON && isLanguageNorwegian ? (
                    <MobilHovedmenyInnholdPrivat hovedmenyLenker={hovedmenyLenker} setUndermeny={setUndermenyLenker} />
                ) : (
                    <>
                        <UnstyledList>
                            {hovedmenyLenker.children.map((menyElement, index) => (
                                <MobilMenypunkt
                                    tekst={menyElement.displayName}
                                    type={'kategori'}
                                    callback={() => setUndermenyLenker(menyElement)}
                                    key={index}
                                />
                            ))}
                        </UnstyledList>
                        {isLanguageNorwegian && <MobilArbeidsflateValg lang={language} />}
                    </>
                )}
            </div>
        </div>
    );
};
