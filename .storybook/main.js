const path = require("path");
module.exports = {
	"stories": [
		"../stories/**/*.stories.mdx",
		"../stories/**/*.stories.@(js|jsx|ts|tsx)"
	],
	"addons": [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"@storybook/addon-storysource",
		"@storybook/addon-postcss",
		"@storybook/addon-a11y",
		"storybook-addon-designs",
		"@storybook/addon-console"
	],
	"framework": "@storybook/react",
	"typescript": {
		check: false,
		checkOptions: {},
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
		},
	},
	"webpackFinal": async (config, { configType }) => {
		const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test && rule.test.test('.svg'));
		fileLoaderRule.exclude = /\.svg$/;

		config.module.rules.unshift({
			test: /\.svg$/,
			enforce: 'pre',
			loader: require.resolve('@svgr/webpack'),
		});
		config.module.rules.push({
			test: /\.scss$/,
			use: ['style-loader', 'css-loader', 'sass-loader'],
			include: path.resolve(__dirname, '../'),
		});
		return config;
	},
};
