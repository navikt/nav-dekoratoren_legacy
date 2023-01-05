import React from 'react';
import { BodyShort } from '@navikt/ds-react';
import Globe from 'ikoner/globe.svg';

import { Expand } from '@navikt/ds-icons';
import { useSelect } from 'downshift';
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

export const farger = {
    navGra20: '#C6C2BF',
    navBla: '#0067C5',
};

const selectorLabel = 'Språk/Language';

export type LocaleOption = AvailableLanguage & { label: string };

interface Props {
    languages: AvailableLanguage[];
}

export const SprakVelger = (props: Props) => {
    const store = useStore();
    const availableLanguages = props.languages;
    const { language } = useSelector((state: AppState) => state.language);
    const [, setCookie] = useCookies([decoratorLanguageCookie]);
    const options = transformOptions(availableLanguages).sort((a, b) => (a.label > b.label ? -1 : 1));

    const onChange = (selected: LocaleOption) => {
        const { label, ...selectedLanguage } = selected;

        setCookie(decoratorLanguageCookie, selectedLanguage.locale, cookieOptions);
        store.dispatch(languageDuck.actionCreator({ language: selectedLanguage.locale }));
        if (selectedLanguage.handleInApp) {
            postMessageToApp('languageSelect', selectedLanguage);
        } else {
            window.location.assign(selectedLanguage.url);
        }
    };
    const { isOpen, selectedItem, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({
        items: options,
        itemToString: (item) => item?.label || '',
        onSelectedItemChange: ({ selectedItem }) => onChange(selectedItem as LocaleOption),
        selectedItem: options.find((option) => option.locale === language),
    });

    const ulStyle = isOpen
        ? {
              boxShadow: '0 0.05rem 0.25rem 0.125rem rgba(0, 0, 0, 0.08)',
              border: '1px solid',
              borderRadius: '0 0 4px 4px',
              outline: 'none',
              borderColor: farger.navGra20,
              borderTop: 'none',
          }
        : {
              display: 'none',
              border: 'none',
          };
    // Adding aria-controls and removing aria-labelledby prop from downshift (to avoid an extra reading of label on screen readers)
    let buttonProps = getToggleButtonProps();
    delete buttonProps['aria-labelledby'];
    let menuProps = getMenuProps();
    delete menuProps['aria-labelledby'];
    menuProps.id = 'sprakvelger_menuID';
    buttonProps['aria-controls'] = menuProps.id;

    return (
        <div className={style.container}>
            <nav className={style.sprakvelger}>
                <button {...buttonProps} className={`${style.knapp} skjemaelement__input`} type="button">
                    <span className={style.knappTekst}>
                        <Bilde asset={Globe} className={style.ikon} />
                        <BodyShort size="small" as={'span'}>
                            {selectorLabel}
                        </BodyShort>
                    </span>
                    <Expand className={style.chevronNed} aria-hidden />
                </button>
                <ul {...menuProps} className={style.menu} style={ulStyle}>
                    <>
                        {options.map((item, index) => (
                            <SprakVelgerItem
                                key={index}
                                item={item}
                                index={index}
                                highlightedIndex={highlightedIndex}
                                itemProps={getItemProps({ item, index })}
                                selectedItem={selectedItem}
                            />
                        ))}
                    </>
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
