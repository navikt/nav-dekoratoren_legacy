import React from 'react';
// @ts-ignore
import Globe from 'ikoner/globe.svg';
import Select from 'react-select';
import { Normaltekst } from 'nav-frontend-typografi';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Styles } from 'react-select/src/styles';
import { ValueType } from 'react-select/src/types';
import { finnTekst } from 'tekster/finn-tekst';
import { useSelector, useStore } from 'react-redux';
import { AppState } from 'store/reducers';
import { languageDuck } from 'store/reducers/language-duck';
import { Language } from 'store/reducers/language-duck';
import { cookieOptions } from 'store/reducers/arbeidsflate-duck';
import { unleashCacheCookie } from 'komponenter/header/Header';
import { decoratorLanguageCookie } from 'komponenter/header/Header';
import { decoratorContextCookie } from 'komponenter/header/Header';
import { Bilde } from '../../../common/bilde/Bilde';
import { useCookies } from 'react-cookie';
import './SprakVelger.less';

const cssPrefix = 'sprakvelger';

const farger = {
    navGra60: '#78706A',
    navBla: '#0067C5',
    navBlaDarken60: '#254b6d',
};

type LocaleOption = {
    value: string;
    language: string;
    label: JSX.Element;
};

const option = (text: string) => (
    <Normaltekst>
        <HoyreChevron className={`${cssPrefix}__chevron`} />
        {text}
    </Normaltekst>
);

const mapLocaleToLanguage: { [key: string]: Language } = {
    no: Language.NORSK,
    nb: Language.NORSK,
    en: Language.ENGELSK,
    se: Language.SAMISK,
};

export const SprakVelger = () => {
    const store = useStore();
    const { language } = useSelector((state: AppState) => state.language);
    const { PARAMS } = useSelector((state: AppState) => state.environment);
    const avilableLanguages = PARAMS.AVAILABLE_LANGUAGES;
    const [cookies, setCookie] = useCookies([
        decoratorLanguageCookie,
        decoratorContextCookie,
        unleashCacheCookie,
    ]);

    const options: LocaleOption[] =
        avilableLanguages?.map((language) => ({
            label: option(
                finnTekst(
                    `sprak`,
                    mapLocaleToLanguage[language.locale]
                ) as string
            ),
            language: language.locale,
            value: language.url,
        })) || [];

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
        const { language, value } = selected as LocaleOption;
        store.dispatch(
            languageDuck.actionCreator({
                language: mapLocaleToLanguage[language],
            })
        );
        setCookie(decoratorLanguageCookie, language, cookieOptions);
        window.location.assign(value);
    };

    return (
        <div className={cssPrefix}>
            <Select
                onChange={onChange}
                className={`${cssPrefix}__select`}
                options={options}
                isSearchable={false}
                placeholder={placeholder}
                styles={styles}
            />
        </div>
    );
};
