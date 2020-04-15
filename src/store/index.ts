import { createStore as createReduxStore, compose } from 'redux';
import { EnvironmentState } from './reducers/environment-duck';
import reducers from './reducers';

export const createStore = (env?: EnvironmentState) => {
    const composeEnhancers = (
        (typeof window !== 'undefined' &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
        compose
    )();

    return composeEnhancers(createReduxStore)(reducers, {
        ...(env && {
            environment: env,
        }),
    });
};
