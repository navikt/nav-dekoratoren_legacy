import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import BEMHelper from 'utils/bem';
import { Language } from 'store/reducers/language-duck';
import { bunnLenker } from 'komponenter/common/arbeidsflate-lenker/hovedmeny-arbeidsflate-lenker';
import ContextLenkepanel from 'komponenter/header/header-regular/common/context-lenkepanel/ContextLenkepanel';
import { ArbeidsflateLenke } from 'komponenter/common/arbeidsflate-lenker/arbeidsflate-lenker';
import './MobilarbeidsflateValg.less';

interface Props {
    lang: Language;
}

const stateProps = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    environment: state.environment,
});

const MobilarbeidsflateValg = ({ lang }: Props) => {
    const { arbeidsflate, environment } = useSelector(stateProps);
    const cls = BEMHelper('mobil-arbeidsflate-valg');
    const lenker = bunnLenker(environment)[arbeidsflate] as ArbeidsflateLenke[];

    return (
        <ul className={cls.className}>
            {lenker.map((lenke, i) => (
                <li key={i} className={cls.element('liste-element')}>
                    <ContextLenkepanel lenke={lenke} language={lang} />
                </li>
            ))}
        </ul>
    );
};

export default MobilarbeidsflateValg;
