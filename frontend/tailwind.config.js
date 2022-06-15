module.exports = {
  important: true,
  mode: 'jit',
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
    fontSize: {
      h0: ['3rem', '3.5rem'],
      h1: ['1.625rem', '2rem'],
      h2: ['1.5rem', '2rem'],
      h3: ['1.25rem', '1.75rem'],
      h4: ['1rem', '1.25rem'],
      h5: ['0.875rem', '1.25rem'],
      h6: ['0.8125rem', '1rem'],
      'body-L': ['1.25rem', {
        letterSpacing: '0.0125rem',
        lineHeight: '2rem',
      }],
      'body-LM': ['1.125rem', {
        letterSpacing: '0.0125rem',
        lineHeight: '1.25rem',
      }],
      'body-M': ['1rem', {
        letterSpacing: '0.0125rem',
        lineHeight: '1.75rem',
      }],
      'body-S': ['0.9375rem', {
        letterSpacing: '0.0125rem',
        lineHeight: '1.5rem',
      }],
      'body-XS': ['0.875rem', {
        letterSpacing: '0.0125rem',
        lineHeight: '1.25rem',
      }],
      'body-XXS': ['0.75rem', {
        letterSpacing: '0.0125rem',
        lineHeight: '1rem',
      }],
      'body-XXXS': ['0.625rem', {
        letterSpacing: '0.0125rem',
        lineHeight: '1rem',
      }],
    },
    fontWeight: {
      light: 200,
      normal: 400,
      semibold: 600,
      bold: 700,
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'var(--color-white)',
      primary: {
        DEFAULT: 'var(--color-primary-100)',
        80: 'var(--color-primary-80)',
        60: 'var(--color-primary-60)',
        10: 'var(--color-primary-10)',
        5: 'var(--color-primary-5)',
      },
      gray: {
        DEFAULT: 'var(--color-gray-100)',
        70: 'var(--color-gray-70)',
        30: 'var(--color-gray-30)',
        20: 'var(--color-gray-20)',
        10: 'var(--color-gray-10)',
        5: 'var(--color-gray-5)',
      },
      green: {
        DEFAULT: 'var(--color-green-100)',
        10: 'var(--color-green-10)',
      },
      red: {
        DEFAULT: 'var(--color-red-100)',
        110: 'var(--color-red-110)',
        10: 'var(--color-red-10)',
      },
      purple: {
        DEFAULT: 'var(--color-purple-100)',
        10: 'var(--color-purple-10)',
      },
    },
    backgroundImage: {
      'gradient-main': 'var(--gradient-main)',
      'gradient-button': 'var(--gradient-button)',
    },
    spacing: {
      0: '0',
      2: '0.125rem',
      4: '0.25rem',
      6: '0.375rem',
      8: '0.5rem',
      12: '0.75rem',
      16: '1rem',
      24: '1.5rem',
      32: '2rem',
      40: '2.5rem',
      48: '3rem',
      56: '3.5rem',
      64: '4rem',
      72: '4.5rem',
      80: '5rem',
      88: '5.5rem',
      96: '6rem',
      104: '6.5rem',
      112: '7rem',
      120: '7.5rem',
      144: '9rem',
      160: '10rem',
      200: '12.5rem',
      240: '15rem',
    },
    boxShadow: {
      1: '0 0.625rem 0.625rem 0 rgb(0 0 0 / 10%)',
      2: '0 1.25rem 1.25rem 0 rgb(0 0 0 / 10%)',
      none: 'none',
    },
    borderRadius: {
      none: '0',
      DEFAULT: '0.5rem',
      4: '0.25rem',
      6: '0.375rem',
      12: '0.75rem',
      16: '1rem',
      full: '50%',
    },
    borderWidth: {
      none: '0',
      DEFAULT: '0.0625rem',
      2: '0.125rem',
    },
    configViewer: {
      themeReplacements: {
        'var(--color-white)': 'rgb(250, 250, 250)',
        'var(--color-primary-100)': 'rgb(217, 117, 40)',
        'var(--color-primary-80)': 'rgb(227,163,61)',
        'var(--color-primary-60)': 'rgb(242,173,60)',
        'var(--color-primary-10)': 'rgb(247,231,172)',
        'var(--color-primary-5)': 'rgb(236,223,203)',
        'var(--color-gray-100)': 'rgb(34, 34, 34)',
        'var(--color-gray-70)': 'rgb(87, 87, 87)',
        'var(--color-gray-30)': 'rgb(170, 170, 170)',
        'var(--color-gray-20)': 'rgb(221, 221, 221)',
        'var(--color-gray-10)': 'rgb(234, 234, 234)',
        'var(--color-gray-5)': 'rgb(242, 242, 242)',
        'var(--color-green-100)': 'rgb(91, 199, 99)',
        'var(--color-green-10)': 'rgb(208, 229, 209)',
        'var(--color-red-110)': 'rgb(218, 46, 46)',
        'var(--color-red-100)': 'rgb(214, 81, 81)',
        'var(--color-red-10)': 'rgb(231, 204, 204)',
        'var(--color-purple-100)': 'rgb(179, 112, 240)',
        'var(--color-purple-10)': 'rgb(224, 210, 236)',
        'var(--gradient-main)': 'linear-gradient( 45deg, rgb(211,98,33) 0%, rgb(242,173,60) 100%)',
        'var(--gradient-button)': 'linear-gradient( 45deg, rgb(211,98,33) 0%, rgb(242,173,60) 50%, rgb(211,98,33) 100%)',
      },
    },
  },
  variants: {
    extend: {
      scale: ['group-hover'],
      height: ['group-hover'],
      transform: ['group-hover'],
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '640px',
          },
          '@screen md': {
            maxWidth: '768px',
          },
          '@screen lg': {
            maxWidth: '1120px',
          },
          '@screen xl': {
            maxWidth: '1120px',
          },
        },
      });
    },
  ],
};
