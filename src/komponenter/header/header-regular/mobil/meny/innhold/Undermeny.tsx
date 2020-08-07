import React, { CSSProperties } from 'react';
import Lenke from 'nav-frontend-lenker';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import { MenyNode } from 'store/reducers/menu-duck';
import BEMHelper from 'utils/bem';
import Lukkundermeny from './elementer/Lukkundermeny';
import Listelement from './elementer/Listelement';
import { genererUrl } from 'utils/Environment';
import { Systemtittel } from 'nav-frontend-typografi';
import { useSelector } from 'react-redux';
import Lock from 'ikoner/meny/Lock';
import { AppState } from 'store/reducers';
import MinsideLockMsg from 'komponenter/header/header-regular/common/minside-lock-msg/MinsideLockMsg';
import SlideToClose from './utils/SlideToClose';

interface Props {
    className: string;
    lenker: MenyNode;
}

const stateSelector = (state: AppState) => ({
    underMenuIsOpen: state.dropdownToggles.undermeny,
});

const Undermeny = (props: Props) => {
    const { lenker } = props;
    const { underMenuIsOpen } = useSelector(stateSelector);
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const auth = useSelector((state: AppState) => state.innloggingsstatus.data);
    const { className } = props;
    const menyClass = BEMHelper(className);

    if (!lenker?.children) {
        return null;
    }

    const hasLevel4Elements =
        auth.securityLevel !== '4' &&
        lenker.children.filter((lenke) => lenke.displayLock).length;

    const arbeidsflate = lenker.displayName
        .charAt(0)
        .toUpperCase()
        .concat(lenker.displayName.slice(1).toLowerCase());

    const lockStyle = {
        position: 'absolute',
        left: '-20px',
    } as CSSProperties;

    const containerClass = menyClass.element(
        'undermeny-innhold',
        underMenuIsOpen ? 'active' : ''
    );

    return (
        <SlideToClose className={containerClass}>
            <Lukkundermeny className={menyClass.className} />
            <Systemtittel
                className={menyClass.element('undermeny-arbeidsflate')}
            >
                {arbeidsflate}
            </Systemtittel>
            {!!hasLevel4Elements && <MinsideLockMsg />}
            <ul className={menyClass.element('meny', 'list')}>
                {lenker.children.map((lenke, index: number) => {
                    const displayLock =
                        lenke.displayLock && auth.securityLevel !== '4';
                    return (
                        <Listelement
                            key={index}
                            className={menyClass.className}
                            classElement="text-element-undermeny"
                        >
                            <Lenke href={genererUrl(XP_BASE_URL, lenke.path)}>
                                {displayLock && (
                                    <div style={lockStyle}>
                                        <Lock height={'18px'} width={'18px'} />
                                    </div>
                                )}
                                <div
                                    className={menyClass.element(
                                        'undermeny-chevron'
                                    )}
                                >
                                    <HoyreChevron />
                                </div>
                                {lenke.displayName}
                            </Lenke>
                        </Listelement>
                    );
                })}
            </ul>
            <div className={menyClass.element('blokk-divider')}>
                <Lukkundermeny className={menyClass.className} />
            </div>
        </SlideToClose>
    );
};

export default Undermeny;
