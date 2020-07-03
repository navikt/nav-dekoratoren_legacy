import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js/stable/regexp'; // Nødvendig for IE11-støtte i visse apper.
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from './store';
import { erDev, verifyWindowObj } from './utils/Environment';
import { fetchEnv } from './utils/Environment';
import { initGA } from './utils/google-analytics';
import { initAmplitude } from './utils/amplitude';
import Header from './komponenter/header/Header';
import { CookiesProvider } from 'react-cookie';
import Cookies from 'universal-cookie';
import { loadableReady } from '@loadable/component';
import './index.less';
import { initGTM } from 'utils/gtm';
import { hentInnloggingsstatus } from 'store/reducers/innloggingsstatus-duck';
import { fetchMenypunkter } from 'store/reducers/menu-duck';
import { MenuValue } from 'utils/meny-storage-utils';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { cookieOptions } from 'store/reducers/arbeidsflate-duck';
import { Language } from 'store/reducers/language-duck';
import { languageDuck } from 'store/reducers/language-duck';
import { EnvironmentState } from 'store/reducers/environment-duck';
import Footer from 'komponenter/footer/Footer';

const loadedStates = ['complete', 'loaded', 'interactive'];

if (erDev) {
    console.log('==========================');
    console.log('======= DEVELOPMENT ======');
    console.log('==========================');
}

const getLanguageFromUrl = (): Language => {
    const locationPath = window.location.pathname;
    if (locationPath.includes('/en/')) {
        return Language.ENGELSK;
    } else if (locationPath.includes('/se/')) {
        return Language.SAMISK;
    }
    return Language.NORSK;
};

const footerIsNearView = () => {
    const footerElement = document.getElementById('decorator-footer');
    return (
        footerElement &&
        footerElement.getBoundingClientRect().top <
            window.pageYOffset + window.innerHeight * 1.5
    );
};

const getAppState = (environment: EnvironmentState) => {
    const cookies = new Cookies();
    const store = createStore(environment, cookies);
    const dispatch = store.dispatch;
    const { APP_BASE_URL, PARAMS } = environment;
    hentInnloggingsstatus(APP_BASE_URL)(dispatch);
    fetchMenypunkter(APP_BASE_URL)(dispatch);

    const defaultToPerson = () => {
        dispatch(settArbeidsflate(MenuValue.PRIVATPERSON));
        cookies.set('decorator-context', MenuValue.PRIVATPERSON, cookieOptions);
    };

    if (PARAMS.CONTEXT !== MenuValue.IKKEBESTEMT) {
        store.dispatch(settArbeidsflate(PARAMS.CONTEXT));
        cookies.set('decorator-context', PARAMS.CONTEXT, cookieOptions);
    } else {
        const context = cookies.get('decorator-context');
        context ? dispatch(settArbeidsflate(context)) : defaultToPerson();
    }

    // Change language
    const checkUrlForLanguage = () => {
        if (PARAMS.LANGUAGE !== Language.IKKEBESTEMT) {
            dispatch(
                languageDuck.actionCreator({
                    language: PARAMS.LANGUAGE,
                })
            );
            cookies.set('decorator-language', PARAMS.LANGUAGE, cookieOptions);
        } else {
            // Fetch state from cookie OR default to norsk
            const language = getLanguageFromUrl();
            dispatch(languageDuck.actionCreator({ language }));
            cookies.set('decorator-language', language, cookieOptions);
        }
    };

    checkUrlForLanguage();
    window.addEventListener('popstate', checkUrlForLanguage);

    return store;
};

const run = () => {
    window.addEventListener('load', () => {
        initGA();
        initAmplitude();
        setTimeout(initGTM, 2000);
    });

    fetchEnv()
        .then((environment) => {
            const store = getAppState(environment);

            return loadableReady(() => {
                ReactDOM.render(
                    <ReduxProvider store={store}>
                        <CookiesProvider>
                            <Header />
                        </CookiesProvider>
                    </ReduxProvider>,
                    document.getElementById('decorator-header')
                );

                const renderFooter = () => {
                    if (footerIsNearView()) {
                        window.removeEventListener('scroll', renderFooter);
                        window.removeEventListener('resize', renderFooter);
                        ReactDOM.render(
                            <ReduxProvider store={store}>
                                <CookiesProvider>
                                    <Footer />
                                </CookiesProvider>
                            </ReduxProvider>,
                            document.getElementById('decorator-footer')
                        );
                    }
                };

                if (footerIsNearView()) {
                    renderFooter();
                } else {
                    window.addEventListener('scroll', renderFooter);
                    window.addEventListener('resize', renderFooter);
                }
            });
        })
        .catch((e) => {
            console.error(e);
        });
};

if (verifyWindowObj()) {
    loadedStates.includes(document.readyState) && document.body
        ? run()
        : window.addEventListener('DOMContentLoaded', run, false);
} else {
    run();
}
