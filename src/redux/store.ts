import { createStore, compose, Store } from 'redux';
import reducers, { AppState } from '../reducer/reducers';
import { EnvironmentState } from '../reducer/environment-duck';

const create = (env?: EnvironmentState) => {
    const composeEnhancers = (
        (typeof window !== 'undefined' &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
        compose
    )();

    return composeEnhancers(createStore)(reducers, {
        ...(env && {
            environment: env,
        }),
    });
};

let store: Store<AppState>;
export const getStore = (env?: EnvironmentState): Store<AppState> => {
    if (!store) {
        store = create(env);
    }
    return store;
};

export default getStore;
