module.exports = {
    "env": {
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": ["eslint:recommended"],
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
        "no-mixed-spaces-and-tabs": ["off", "smart-tabs"],
        "no-unused-vars": "warn",
        "no-extra-semi": "warn"
    }
};
