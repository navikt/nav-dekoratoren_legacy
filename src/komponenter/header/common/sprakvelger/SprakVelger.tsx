import React from 'react';
import Globe from 'ikoner/globe.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import { NedChevron } from 'nav-frontend-chevron';
import { useSelect } from 'downshift';
import { decoratorLanguageCookie } from '../../Header';
import { cookieOptions } from 'store/reducers/arbeidsflate-duck';
import { AvailableLanguage } from 'store/reducers/language-duck';
import { languageDuck } from 'store/reducers/language-duck';
import { postMessageToApp } from 'utils/messages';
import { useCookies } from 'react-cookie';
import { useSelector, useStore } from 'react-redux';
import { AppState } from 'store/reducers';
import { Bilde } from '../../../common/bilde/Bilde';
import BEMHelper from 'utils/bem';
import Item from './Item';
import './SprakVelger.less';

export const farger = {
    navGra20: '#C6C2BF',
    navBla: '#0067C5',
};

export type LocaleOption = {
    value: string;
    locale: string;
    handleInApp?: boolean;
    label: string;
};

interface Props {
    availableLanguages: AvailableLanguage[];
}

export const SprakVelger = (props: Props) => {
    const store = useStore();
    const cls = BEMHelper('sprakvelger');
    const { language } = useSelector((state: AppState) => state.language);
    const [, setCookie] = useCookies([decoratorLanguageCookie]);
    const options = transformOptions(props.availableLanguages).sort((a, b) =>
        a.label > b.label ? -1 : 1
    );

    const onChange = (selected: LocaleOption) => {
        const { locale, value, handleInApp } = selected as LocaleOption;
        setCookie(decoratorLanguageCookie, locale, cookieOptions);
        store.dispatch(languageDuck.actionCreator({ language: locale }));
        if (handleInApp) {
            postMessageToApp('languageSelect', {
                url: value,
                locale: locale,
                handleInApp: handleInApp,
            });
        } else {
            window.location.assign(value);
        }
    };

    const {
        isOpen,
        selectedItem,
        getToggleButtonProps,
        getLabelProps,
        getMenuProps,
        highlightedIndex,
        getItemProps,
    } = useSelect({
        items: options,
        itemToString: (item) => item?.value || '',
        onSelectedItemChange: ({ selectedItem }) =>
            onChange(selectedItem as LocaleOption),
        defaultSelectedItem: options.find(
            (option) => option.locale === language
        ),
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
        : { border: 'none' };

    const label = 'Språk/Language';
    return (
        <div className={cls.element('container')}>
            <div className={cls.className}>
                <label {...getLabelProps()} className="sr-only">
                    <Normaltekst>{label}</Normaltekst>
                </label>
                <button
                    {...getToggleButtonProps()}
                    className={`${cls.element('knapp')} skjemaelement__input`}
                    type="button"
                >
                    <span className={cls.element('knapp-tekst')}>
                        <Bilde asset={Globe} className={cls.element('ikon')} />
                        <Normaltekst>{label}</Normaltekst>
                    </span>
                    <NedChevron />
                </button>
                <ul
                    {...getMenuProps()}
                    className={cls.element('menu')}
                    style={ulStyle}
                >
                    {isOpen && (
                        <>
                            {options.map((item, index) => (
                                <Item
                                    key={index}
                                    cls={cls}
                                    item={item}
                                    index={index}
                                    highlightedIndex={highlightedIndex}
                                    itemProps={getItemProps({ item, index })}
                                    selectedItem={selectedItem}
                                />
                            ))}
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

// Utils
const transformOptions = (languages: AvailableLanguage[]) =>
    languages.map((languageParam) => {
        const locale = languageParam.locale;
        const labels: { [key: string]: string } = {
            nb: 'Norsk (bokmål)',
            nn: 'Norsk (nynorsk)',
            en: 'English',
            se: 'Sámegiel',
            pl: 'Polski',
        };

        return {
            label: labels[locale],
            locale: languageParam.locale,
            handleInApp: languageParam.handleInApp,
            value: languageParam.url,
        };
    });
