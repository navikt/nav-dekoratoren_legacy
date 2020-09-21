import React, { useEffect } from 'react';
import BEMHelper from 'utils/bem';
import { useCookies } from 'react-cookie';
import './Sprakvarsel.less';
import { decoratorLanguageCookie } from '../../Header';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import AlertStripe from 'nav-frontend-alertstriper';
import { Locale } from 'store/reducers/language-duck';

const Sprakvarsel = () => {
    const cls = BEMHelper('sprakvarsel');
    const { environment, language } = useSelector((state: AppState) => state);
    const { PARAMS } = environment;
    const { AVAILABLE_LANGUAGES } = PARAMS;
    const [cookies] = useCookies([decoratorLanguageCookie]);
    const cookieLanguage = cookies[decoratorLanguageCookie];

    const preferedLanguage = AVAILABLE_LANGUAGES?.filter(
        (language) => language.locale === cookieLanguage
    ).shift();

    const showMessage =
        PARAMS.LANGUAGE !== cookieLanguage &&
        PARAMS.LANGUAGE !== Locale.IKKEBESTEMT &&
        (!AVAILABLE_LANGUAGES || !preferedLanguage);

    useEffect(() => {
        if (PARAMS.LANGUAGE !== cookieLanguage && preferedLanguage) {
            window.location.assign(preferedLanguage.url);
        }
    });

    const message: { [key: string]: string } = {
        nb: 'Denne siden er ikke tilgjengelig på bokmål',
        nn: 'Denne siden er ikke tilgjengelig på nynorsk',
        en: 'This page is not available in english',
        se: 'Denne siden er ikke tilgjengelig på samisk',
        pl: 'Ta strona nie jest dostępna w języku polskim',
    };

    return showMessage ? (
        <div className={cls.element('container')}>
            <div className={cls.element('content')}>
                <AlertStripe type={'info'} form="inline">
                    {message[cookieLanguage]}
                </AlertStripe>
            </div>
        </div>
    ) : null;
};

export default Sprakvarsel;
