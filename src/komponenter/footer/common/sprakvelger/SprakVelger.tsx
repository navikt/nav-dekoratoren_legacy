import React, { useEffect, useState } from 'react';
// @ts-ignore
import Globe from 'ikoner/globe.svg';
import Check from 'ikoner/check.svg';
import Select from 'react-select';
import { Normaltekst } from 'nav-frontend-typografi';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Styles } from 'react-select/src/styles';
import { ValueType } from 'react-select/src/types';
import { finnTekst } from 'tekster/finn-tekst';
import { useSelector, useStore } from 'react-redux';
import { AppState } from 'store/reducers';
import { languageDuck, LanguageParam } from 'store/reducers/language-duck';
import { Language } from 'store/reducers/language-duck';
import { cookieOptions } from 'store/reducers/arbeidsflate-duck';
import { unleashCacheCookie } from 'komponenter/header/Header';
import { decoratorLanguageCookie } from 'komponenter/header/Header';
import { decoratorContextCookie } from 'komponenter/header/Header';
import { useCookies } from 'react-cookie';
import { Bilde } from '../../../common/bilde/Bilde';
import './SprakVelger.less';
import { postMessageToApp } from '../../../../utils/messages';

const cssPrefix = 'sprakvelger';

const farger = {
    navGra60: '#78706A',
    navBla: '#0067C5',
    navBlaDarken60: '#254b6d',
};

type LocaleOption = {
    value: string;
    language: string;
    handleInApp?: boolean;
    label: JSX.Element;
};

const option = (text: string, selected: boolean) => (
    <div className={'sprakvelger__option'}>
        <Normaltekst>
            <HoyreChevron className={`${cssPrefix}__chevron`} />
            <span>{text}</span>
        </Normaltekst>
        {selected && (
            <Bilde asset={Check} className={'sprakvelger__option-icon'} />
        )}
    </div>
);

const mapLocaleToLanguage: { [key: string]: Language } = {
    no: Language.NORSK,
    nb: Language.NORSK,
    en: Language.ENGELSK,
    se: Language.SAMISK,
};

interface Props {
    availableLanguages: LanguageParam[];
}

export const SprakVelger = (props: Props) => {
    const store = useStore();
    const { language } = useSelector((state: AppState) => state.language);
    const options = transformOptions(props.availableLanguages, language);
    const [, setCookie] = useCookies([
        decoratorLanguageCookie,
        decoratorContextCookie,
        unleashCacheCookie,
    ]);

    const placeholder = (
        <span className={`${cssPrefix}__placeholder`}>
            <Bilde asset={Globe} className={`${cssPrefix}__ikon`} />
            <Normaltekst>{finnTekst('sprak-velg', language)}</Normaltekst>
        </span>
    );

    const styles: Styles = {
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? farger.navBla : 'white',
            color: state.isFocused ? 'white' : 'black',
        }),
        control: (provided, state) => ({
            ...provided,
            boxShadow: state.isFocused
                ? `0 0 0 3px ${farger.navBlaDarken60}`
                : provided.boxShadow,
            borderColor: farger.navGra60,
            '&:hover': { borderColor: farger.navBla },
        }),
        menu: (provided) => ({
            ...provided,
            marginTop: '3px',
            paddingTop: '1px',
            borderTopLeftRadius: '0',
            borderTopRightRadius: '0',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'black',
        }),
    };

    const onChange = (selected: ValueType<LocaleOption>) => {
        const { language, value, handleInApp } = selected as LocaleOption;
        setCookie(decoratorLanguageCookie, language, cookieOptions);
        store.dispatch(
            languageDuck.actionCreator({
                language: mapLocaleToLanguage[language],
            })
        );

        if (handleInApp) {
            postMessageToApp('languageSelect', {
                url: value,
                locale: language,
                handleInApp,
            });
        } else {
            window.location.assign(value);
        }
    };

    return (
        <div className={cssPrefix}>
            <Select
                onChange={onChange}
                className={`${cssPrefix}__select`}
                options={options}
                value
                {...null}
                isSearchable={false}
                placeholder={placeholder}
                styles={styles}
            />
        </div>
    );
};

// Utils
const transformOptions = (
    languages: LanguageParam[],
    selectedLanguage: Language
) =>
    languages.map((language) => {
        const mappedLanguage = mapLocaleToLanguage[language.locale];
        const defaultLabel = option(
            finnTekst(`sprak`, mappedLanguage) as string,
            mappedLanguage === selectedLanguage
        );

        return {
            label: defaultLabel,
            language: language.locale,
            handleInApp: language.handleInApp,
            isDisabled: mappedLanguage === selectedLanguage,
            value: language.url,
        };
    });
