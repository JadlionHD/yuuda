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
		"indent": ["error", 2],
		"quotes": ["error", "double"],
		"no-unused-vars": "warn",
		"semi": ["error", "always"]
	}
};
