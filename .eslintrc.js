module.exports = {
    "parser": "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            modules: true
        }
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                "multiline": {
                    "delimiter": "semi",
                    "requireLast": true
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false
                }
            }
        ],
        "@typescript-eslint/quotes": [
            "error",
            "single"
        ],
        "@typescript-eslint/semi": [
            "error",
            "always"
        ],
        "jsx-quotes": [
            "error",
            "prefer-double"
        ],
        "object-curly-spacing": ["error", "always"],
        "template-curly-spacing": "error",
        "no-duplicate-imports": "error",
        "no-magic-numbers": [
            "error",
            {
                "ignore": [1, -1, 0, 10, 2, 24, 60, 1000, 400, 404],
                "ignoreArrayIndexes": true,
            }
        ],
        "no-multiple-empty-lines": "error",
        "comma-dangle": ["error", "always-multiline"],
        "curly": "error"
    }
};
