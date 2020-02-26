const { defaults } = require('jest-config');

module.exports = {
    setupTestFrameworkScriptFile: '<rootDir>/setupTest.js',

    moduleNameMapper: {
        '\\.(css|jpg|png|svg|less)$': '<rootDir>/src/styleMock.js',
        'nav-(.*)-style': '<rootDir>/src/styleMock.js',
    },

    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],

    rootDir: '.',
};
