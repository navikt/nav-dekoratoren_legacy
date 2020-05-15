import { compose, createStore as createReduxStore } from 'redux';
import { Request } from 'express';
import { EnvironmentState } from './reducers/environment-duck';
import reducers from './reducers';
import Cookies from 'universal-cookie';
import { Language } from './reducers/language-duck';
import { MenuValue } from '../utils/meny-storage-utils';

export const createStore = (env?: EnvironmentState, req?: Request) => {
    const composeEnhancers = (
        (typeof window !== 'undefined' &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
        compose
    )();

    const paramLanguage =
        env?.PARAMS.LANGUAGE !== Language.IKKEBESTEMT && env?.PARAMS.LANGUAGE;
    const paramContext =
        env?.PARAMS.CONTEXT !== MenuValue.IKKEBESTEMT && env?.PARAMS.CONTEXT;

    const cookies = new Cookies(req && req.headers.cookie);
    const cookieLanguage = cookies.get('decorator-language');
    const cookieContext = cookies.get('decorator-context');

    const initialLanguage = paramLanguage || cookieLanguage;
    const initialContext = cookieContext || paramContext;

    return composeEnhancers(createReduxStore)(reducers, {
        ...(env && {
            environment: env,
        }),
        ...(initialLanguage && {
            language: {
                language: initialLanguage,
            },
        }),
        ...(initialContext && {
            arbeidsflate: {
                status: initialContext,
            },
        }),
    });
};
