const presets = ['module:metro-react-native-babel-preset'];
const plugins = [];

plugins.push(
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ['./src'],
      extensions: ['.js', '.json'],
      alias: {
        'assets/*': './src/assets/*',
        'components/*': './src/components/*',
        'constants/*': './src/constants/*',
        'navigators/*': './src/navigators/*',
        'features/*': './src/features/*',
        'screens/*': './src/screens/*',
        'reduxStore/*': './src/reduxStore/*',
        'utils/*': './src/utils/*',
        'styles/*': './src/styles/*',
      },
    },
    'react-native-reanimated/plugin',
  ],
  'react-native-reanimated/plugin',
);

module.exports = {
  presets,
  plugins,
};
