import React from 'react';
import Globe from 'ikoner/globe.svg';
import Cicle from 'ikoner/circle.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import { NedChevron } from 'nav-frontend-chevron';
import { ValueType } from 'react-select/src/types';
import { useSelect } from 'downshift';
import { decoratorLanguageCookie } from '../../Header';
import { cookieOptions } from 'store/reducers/arbeidsflate-duck';
import { AvailableLanguage } from 'store/reducers/language-duck';
import { languageDuck, Locale } from 'store/reducers/language-duck';
import { postMessageToApp } from 'utils/messages';
import { useCookies } from 'react-cookie';
import Tekst, { finnTekst } from 'tekster/finn-tekst';
import { useSelector, useStore } from 'react-redux';
import { AppState } from 'store/reducers';
import { Bilde } from '../../../common/bilde/Bilde';
import './SprakVelger.less';

const cssPrefix = 'sprakvelger';

const farger = {
    navGra20: '#C6C2BF',
    navBla: '#0067C5',
};

type LocaleOption = {
    value: string;
    locale: string;
    handleInApp?: boolean;
    label: JSX.Element;
};

interface Props {
    availableLanguages: AvailableLanguage[];
}

export const SprakVelger = (props: Props) => {
    const store = useStore();
    const { language } = useSelector((state: AppState) => state.language);
    const [, setCookie] = useCookies([decoratorLanguageCookie]);
    const options = transformOptions(props.availableLanguages);

    const onChange = (selected: ValueType<LocaleOption>) => {
        const { locale, value, handleInApp } = selected as LocaleOption;
        console.log('set cookie' + locale);
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

    const knappeInnhold = (
        <span className={`${cssPrefix}__knapp-tekst`}>
            <Bilde asset={Globe} className={`${cssPrefix}__ikon`} />
            <Normaltekst>{finnTekst('sprak-velg', language)}</Normaltekst>
        </span>
    );

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
        itemToString: (item) => (item ? item.value : ''),
        onSelectedItemChange: (changes) =>
            onChange(changes.selectedItem as ValueType<LocaleOption>),
        defaultSelectedItem: options.find(
            (option) => option.locale === language
        ),
    });

    return (
        <div className={`${cssPrefix}__container`}>
            <div className={cssPrefix}>
                <label {...getLabelProps()} className="sr-only">
                    <Tekst id={'sprak-velg'} />
                </label>
                <button
                    {...getToggleButtonProps()}
                    className={`${cssPrefix}__knapp skjemaelement__input`}
                    type="button"
                >
                    {knappeInnhold}
                    <NedChevron />
                </button>

                <ul
                    {...getMenuProps()}
                    className={`${cssPrefix}__menu`}
                    style={
                        isOpen
                            ? {
                                  boxShadow:
                                      '0 0.05rem 0.25rem 0.125rem rgba(0, 0, 0, 0.08)',
                                  border: '1px solid',
                                  borderRadius: '0 0 4px 4px',
                                  outline: 'none',
                                  borderColor: farger.navGra20,
                                  borderTop: 'none',
                              }
                            : { border: 'none' }
                    }
                >
                    {isOpen &&
                        options.map((item, index) => (
                            <li
                                {...getItemProps({ item, index })}
                                style={
                                    highlightedIndex === index
                                        ? {
                                              backgroundColor: farger.navBla,
                                              color: 'white',
                                          }
                                        : {
                                              backgroundColor: 'white',
                                              color: 'black',
                                          }
                                }
                                className="menuList"
                                key={`${item.value}${index}`}
                            >
                                {selectedItem?.locale === item.locale ? (
                                    <div className={`${cssPrefix}__option`}>
                                        <Bilde asset={Cicle} />
                                        <Normaltekst>
                                            {item.label}{' '}
                                            <span className="sr-only">
                                                {finnTekst(
                                                    'sprak-valgt',
                                                    language
                                                )}
                                            </span>
                                        </Normaltekst>
                                    </div>
                                ) : (
                                    <Normaltekst
                                        className={`${cssPrefix}__option`}
                                    >
                                        <span className="not-selected">
                                            {item.label}
                                        </span>
                                    </Normaltekst>
                                )}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

// Utils
const transformOptions = (languages: AvailableLanguage[]) =>
    languages.map((languageParam) => {
        const locale = languageParam.locale;
        const label = finnTekst(`sprak`, locale);
        return {
            label: label,
            locale: languageParam.locale,
            handleInApp: languageParam.handleInApp,
            value: languageParam.url,
        };
    });
