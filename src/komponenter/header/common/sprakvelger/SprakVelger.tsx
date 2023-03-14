import React, { useEffect } from 'react';
import { Expand } from '@navikt/ds-icons';
import classNames from 'classnames';
import { decoratorLanguageCookie } from '../../Header';
import { cookieOptions } from '../../../../server/cookieSettings';
import { AvailableLanguage } from 'store/reducers/language-duck';
import { languageDuck } from 'store/reducers/language-duck';
import { postMessageToApp } from 'utils/messages';
import { useCookies } from 'react-cookie';
import { useSelector, useStore } from 'react-redux';
import { AppState } from 'store/reducers';
import { Bilde } from '../../../common/bilde/Bilde';
import Globe from 'ikoner/globe.svg';
import SprakVelgerItem from './SprakVelgerItem';

import style from './SprakVelger.module.scss';

export type LocaleOption = AvailableLanguage & { label: string };

interface Props {
    languages: AvailableLanguage[];
}

export const SprakVelger = (props: Props) => {
    const store = useStore();
    const availableLanguages = props.languages;
    const { language } = useSelector((state: AppState) => state.language);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [selectedLocale, setSelectedLocale] = React.useState<LocaleOption | null>(null);
    const [, setCookie] = useCookies([decoratorLanguageCookie]);
    const languageOptions = transformOptions(availableLanguages).sort((a, b) => (a.label > b.label ? -1 : 1));

    useEffect(() => {
        if (selectedLocale === null) {
            const selected = languageOptions.find((option) => option.locale === language);
            setSelectedLocale(selected || null);
        }
    }, [language, languageOptions, selectedLocale]);

    const onChange = (selected: LocaleOption) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { label, ...selectedLanguage } = selected;
        setSelectedLocale(selected);
        setCookie(decoratorLanguageCookie, selectedLanguage.locale, cookieOptions);
        store.dispatch(languageDuck.actionCreator({ language: selectedLanguage.locale }));

        if (selectedLanguage.handleInApp) {
            postMessageToApp('languageSelect', selectedLanguage);
        } else {
            window.location.assign(selectedLanguage.url);
        }

        toggleMenu(false);
    };

    const onKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
            const buttons = document.querySelectorAll(`.${style.sprakvelger} button`);
            // If focus is not on any of the language option buttons, close the menu
            const hasOptionFocus = Array.from(buttons).some((button) => button === document.activeElement);
            if (!hasOptionFocus) {
                toggleMenu(false);
            }
        }
        if (e.key === 'Escape') {
            toggleMenu(false);
        }
    };

    const onClick = (e: MouseEvent) => {
        const isClickOutside = !e.composedPath().some((el) => el === document.querySelector(`.${style.sprakvelger}`));
        if (isClickOutside) {
            toggleMenu(false);
        }
    };

    const toggleMenu = (open?: boolean) => {
        const isIntentToOpen = open !== undefined ? open : !isMenuOpen;

        if (isIntentToOpen) {
            window.addEventListener('keyup', onKeyUp);
            window.addEventListener('click', onClick);
        } else {
            window.removeEventListener('keyup', onKeyUp);
            window.removeEventListener('click', onClick);
        }

        setIsMenuOpen(isIntentToOpen);
    };

    return (
        <div className={style.container}>
            <nav className={style.sprakvelger}>
                <button
                    className={`${style.knapp}`}
                    type="button"
                    aria-expanded={isMenuOpen}
                    onClick={() => toggleMenu()}
                >
                    <span className={style.knappTekst}>
                        <Bilde asset={Globe} className={style.ikon} />
                        <span lang="no">Språk</span>/<span lang="en">Language</span>
                    </span>
                    <Expand className={style.chevronNed} aria-hidden />
                </button>
                <ul className={classNames(style.menu, isMenuOpen && style.menuOpenState)}>
                    {languageOptions.map((option, index) => (
                        <SprakVelgerItem
                            key={index}
                            item={option}
                            index={index}
                            selectedItem={selectedLocale}
                            onSelectedItemChange={() => onChange(option as LocaleOption)}
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
