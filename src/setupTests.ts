export const localStorageMock = function() {
    let store = {};
    return {
        getItem: function(key: string) {
            return store[key];
        },
        setItem: function(key: string, value: any) {
            // tslint:disable-line:no-any
            store[key] = value ? value.toString() : '';
        },
        clear: function() {
            store = {};
        },
        removeItem: function(key: string) {
            delete store[key];
        },
    };
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock() });
Object.defineProperty(window, 'scrollTo', { value: () => {} }); // tslint:disable-line
