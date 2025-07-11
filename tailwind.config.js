import colors from 'tailwindcss/colors';

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      ...colors,
      white: '#ffffff',
      black: '#000000',
      gray: colors.gray,
      blue: colors.blue,
      red: colors.red,
      green: colors.green,
    },
  },
};
