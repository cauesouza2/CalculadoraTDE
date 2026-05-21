import js from "@eslint/js";

export default [
    {
        ignores: ["coverage/**", "dist/**", "node_modules/**", "test-results/**"],
    },
    js.configs.recommended,
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                console: "readonly",
                document: "readonly",
            },
        },
        rules: {
            "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        },
    },
];
