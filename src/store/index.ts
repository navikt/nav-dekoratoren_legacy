import { compose, createStore as createReduxStore } from 'redux';
import { Environment } from './reducers/environment-duck';
import reducers from './reducers';
import { Locale } from './reducers/language-duck';
import { MenuValue } from '../utils/meny-storage-utils';

export const createStore = (env?: Environment) => {
    const composeEnhancers = (
        (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
        compose
    )();

    const paramLanguage = env?.PARAMS.LANGUAGE !== Locale.IKKEBESTEMT && env?.PARAMS.LANGUAGE;
    const paramContext = env?.PARAMS.CONTEXT !== MenuValue.IKKEBESTEMT && env?.PARAMS.CONTEXT;

    return composeEnhancers(createReduxStore)(reducers, {
        ...(env && {
            environment: env,
        }),
        ...(paramLanguage && {
            language: {
                language: paramLanguage,
            },
        }),
        ...(paramContext && {
            arbeidsflate: {
                status: paramContext,
            },
        }),
    });
};
