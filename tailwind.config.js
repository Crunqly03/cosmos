module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // screens: {
    //   'sm': '200px',
    //   // => @media (min-width: 640px) { ... }

    //   'md': '680px',
    //   // => @media (min-width: 768px) { ... }

    //   'lg': '1290px',
    //   // => @media (min-width: 1024px) { ... }

    //   'xl': '1280px',
    //   // => @media (min-width: 1280px) { ... }

    //   '2xl': '1536px',
    //   // => @media (min-width: 1536px) { ... }
    // },
    
    extend: {
      height: {
        '128': '26rem',
      },
      colors: {
        primary: '#046a38',
        secondary: '#17a478',
        greenmain: '#3e7272',
        green2: '#064d4c',
        blurred: 'rgba(255,255,255,0.25)',
        blurred2: 'rgba(0,0,0,0.25)'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
