import { createStore as createReduxStore, compose } from 'redux';
import { EnvironmentState } from './reducers/environment-duck';
import { persistStore } from 'redux-persist';
import createCompressor from 'redux-persist-transform-compress';
import reducers from './reducers';

export const createStore = (env?: EnvironmentState) => {
    const composeEnhancers = (
        (typeof window !== 'undefined' &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
        compose
    )();

    const store = composeEnhancers(createReduxStore)(reducers, {
        ...(env && {
            environment: env,
        }),
    });

    const compressor = createCompressor();
    const persistor = persistStore(store, {
        transforms: [compressor],
    } as any);

    return {
        store,
        persistor,
    };
};
