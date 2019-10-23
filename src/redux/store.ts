import { createStore, compose, Store } from 'redux';
import { reducer, AppState } from '../reducer/reducer';

function create() {
    /* tslint:disable:no-any */
    let useExtension = false;
    let composer = compose;

    if (typeof window !== 'undefined') {
        useExtension =
            (window as any).__REDUX_DEVTOOLS_EXTENSION__ !== undefined;

        const composer = useExtension
            ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            : compose;
    } else {
        const useExtension = false;
        composer = compose;
    }

    const composed = composer();

    return composed(createStore)(reducer, {});
}

let store: Store<AppState>;
export default function getStore(): Store<AppState> {
    if (!store) {
        store = create();
    }
    return store;
}
