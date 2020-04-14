import { createStore as createReduxStore, compose } from 'redux';
import reducers from '../reducer/reducers';
import { EnvironmentState } from '../reducer/environment-duck';

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
