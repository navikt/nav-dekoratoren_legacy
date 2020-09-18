import React, { useEffect } from 'react';
import BEMHelper from 'utils/bem';
import { useCookies } from 'react-cookie';
import './Sprakvarsel.less';
import { decoratorLanguageCookie } from '../../Header';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../store/reducers';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Locale } from '../../../../store/reducers/language-duck';
import Tekst from '../../../../tekster/finn-tekst';

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
    };

    return showMessage ? (
        <div className={cls.element('container')}>
            <div className={cls.element('content')}>
                <AlertStripeInfo>{message[cookieLanguage]}</AlertStripeInfo>
            </div>
        </div>
    ) : null;
};

export default Sprakvarsel;
