import { createStore as createReduxStore, compose } from 'redux';
import { Request } from 'express';
import { EnvironmentState } from './reducers/environment-duck';
import reducers from './reducers';
import Cookies from 'universal-cookie';

export const createStore = (env?: EnvironmentState, req?: Request) => {
    const composeEnhancers = (
        (typeof window !== 'undefined' &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
        compose
    )();

    const cookies = new Cookies(req && req.headers.cookie);
    const cookieLanguage = cookies.get('decorator-language');
    const cookieContext = cookies.get('decorator-context');

    return composeEnhancers(createReduxStore)(reducers, {
        ...(env && {
            environment: env,
        }),
        ...(cookieLanguage && {
            language: {
                language: cookieLanguage,
            },
        }),
        ...(cookieContext && {
            arbeidsflate: {
                status: cookieContext,
            },
        }),
    });
};
