const { defaults } = require('jest-config');

module.exports = {
    setupTestFrameworkScriptFile: '<rootDir>/src/utils/jest/setupTest.js',

    moduleNameMapper: {
        '\\.(css|jpg|png|svg|less)$': '<rootDir>/src/utils/jest/styleMock.js',
        'nav-(.*)-style': '<rootDir>/src/utils/jest/styleMock.js',
    },

    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],

    rootDir: '.',
};
