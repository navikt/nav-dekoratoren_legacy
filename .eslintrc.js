module.exports = {
    root: true,
    plugins: ['react', '@typescript-eslint', 'css-modules'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:css-modules/recommended',
    ],
    parser: '@typescript-eslint/parser',
    rules: {
        'react/prop-types': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^(_*|req|res|next)$',
            },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'css-modules/no-unused-class': [1, { camelCase: true }],
        'css-modules/no-undef-class': [2, { camelCase: true }],
    },
    env: { browser: true, node: true },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
