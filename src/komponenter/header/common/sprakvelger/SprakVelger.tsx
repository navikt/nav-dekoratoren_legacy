import React, { useEffect } from 'react';
import { BodyShort } from '@navikt/ds-react';
import Globe from 'ikoner/globe.svg';

import { Expand } from '@navikt/ds-icons';
import { decoratorLanguageCookie } from '../../Header';
import { cookieOptions } from '../../../../server/cookieSettings';
import { AvailableLanguage } from 'store/reducers/language-duck';
import { languageDuck } from 'store/reducers/language-duck';
import { postMessageToApp } from 'utils/messages';
import { useCookies } from 'react-cookie';
import { useSelector, useStore } from 'react-redux';
import { AppState } from 'store/reducers';
import { Bilde } from '../../../common/bilde/Bilde';
import SprakVelgerItem from './SprakVelgerItem';
import style from 'komponenter/header/common/sprakvelger/SprakVelger.module.scss';
import classNames from 'classnames';

export const farger = {
    navGra20: '#C6C2BF',
    navBla: '#0067C5',
};

export type LocaleOption = AvailableLanguage & { label: string };

interface Props {
    languages: AvailableLanguage[];
}

export const SprakVelger = (props: Props) => {
    const store = useStore();
    const availableLanguages = props.languages;
    const [isOpen, setIsOpen] = React.useState(false);
    const { language } = useSelector((state: AppState) => state.language);
    const [selectedItem, setSelectedItem] = React.useState<LocaleOption | null>(null);
    const [, setCookie] = useCookies([decoratorLanguageCookie]);
    const options = transformOptions(availableLanguages).sort((a, b) => (a.label > b.label ? -1 : 1));

    useEffect(() => {
        if (selectedItem === null) {
            const selected = options.find((option) => option.locale === language);
            setSelectedItem(selected || null);
        }
    }, []);

    const onChange = (selected: LocaleOption) => {
        const { label, ...selectedLanguage } = selected;
        setSelectedItem(selected);

        setCookie(decoratorLanguageCookie, selectedLanguage.locale, cookieOptions);
        store.dispatch(languageDuck.actionCreator({ language: selectedLanguage.locale }));
        if (selectedLanguage.handleInApp) {
            postMessageToApp('languageSelect', selectedLanguage);
        } else {
            window.location.assign(selectedLanguage.url);
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        const target = e.target as HTMLElement;

        if (e.key === 'Escape') {
            toggleMenu(false);
        }
    };

    const handleMouseClick = (e: MouseEvent) => {
        const isClickOutside = !e.composedPath().some((el) => el === document.querySelector(`.${style.sprakvelger}`));
        if (isClickOutside) {
            toggleMenu(false);
        }
    };

    const toggleMenu = (open?: boolean) => {
        const desireOpen = open !== undefined ? open : !isOpen;

        if (desireOpen) {
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('click', handleMouseClick);
        } else {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('click', handleMouseClick);
        }

        setIsOpen(desireOpen);
    };

    return (
        <div className={style.container}>
            <div id="languageDescription" className={style.screenreaderOnly} lang="no">
                Velg språk
            </div>
            <nav className={style.sprakvelger}>
                <button
                    className={`${style.knapp} skjemaelement__input`}
                    type="button"
                    aria-expanded={isOpen}
                    aria-labelledby="languageDescription"
                    onClick={() => toggleMenu()}
                >
                    <div className={style.knappTekst}>
                        <Bilde asset={Globe} className={style.ikon} />
                        <BodyShort size="small" as={'span'}>
                            <span lang="no">Språk</span>/<span lang="en">Language</span>
                        </BodyShort>
                    </div>
                    <Expand className={style.chevronNed} aria-hidden />
                </button>
                <ul className={classNames(style.menu, isOpen && style.menuOpenState)}>
                    {options.map((item, index) => (
                        <SprakVelgerItem
                            key={index}
                            item={item}
                            index={index}
                            selectedItem={selectedItem}
                            onSelectedItemChange={() => onChange(selectedItem as LocaleOption)}
                        />
                    ))}
                </ul>
            </nav>
        </div>
    );
};

const labels: { [key: string]: string } = {
    nb: 'Norsk (bokmål)',
    nn: 'Norsk (nynorsk)',
    en: 'English',
    se: 'Sámegiel',
    pl: 'Polski',
    uk: 'Українська',
    ru: 'Русский',
};

// Utils
const transformOptions = (languages: AvailableLanguage[]): LocaleOption[] =>
    languages.map((language) => ({
        ...language,
        label: labels[language.locale],
    }));
