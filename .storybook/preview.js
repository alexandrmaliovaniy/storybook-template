import {withConsole} from "@storybook/addon-console";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorator = [
	(Story) => {
		return withConsole(Story)
	}
]