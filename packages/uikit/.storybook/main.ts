import type { StorybookConfig } from '@storybook/react-vite'
const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-themes',
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        // postCss: true,
      }
    }
  ],
  docs: {
    autodocs: 'tag'
  },
  // viteFinal: async (config) => {
  //   config.css = {
  //     modules: {
  //       localsConvention: 'camelCaseOnly'
  //     }
  //   }

  //   return config
  // },
  staticDirs: ['../public'] //👈 Configures the static asset folder in Storybook
}
export default config
