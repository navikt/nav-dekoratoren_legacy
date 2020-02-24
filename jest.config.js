const { defaults } = require('jest-config');

module.exports = {
    setupTestFrameworkScriptFile: '<rootDir>/setupTest.js',

    moduleNameMapper: {
        '\\.(css|jpg|png|svg|less)$': '<rootDir>/styleMock.js',
        'nav-(.*)-style': '<rootDir>/styleMock.js',
    },

    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],

    rootDir: '.',
};
