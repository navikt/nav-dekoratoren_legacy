import { createStore, compose, Store } from 'redux';
import { reducer, AppState } from '../reducer/reducer';
import { EnvironmentState } from '../reducer/environment-duck';

function create() {
    const composeEnhancers = (
        (typeof window !== 'undefined' &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
        compose
    )();

    return composeEnhancers(createStore)(reducer, {});
}

let store: Store<AppState>;
export default function getStore(env?: EnvironmentState): Store<AppState> {
    if (!store) {
        store = create();
    }
    return store;
}
