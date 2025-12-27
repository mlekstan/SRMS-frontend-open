import { createTheme } from "@mui/material";


const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class"
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#0a2117',
          light: '#399a6e',
          dark: '#3B4D45',
        },
        background: {
          paper: '#e0e0e0'
        }
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#0a2117',
          light: '#399a6e',
          dark: '#3B4D45',          
        },
        background: {
          default: '#303030',
          paper: '#424242'
        }
      },
    },
  },
  typography: {
    fontFamily: [
      'IBM Plex Mono', 
      'system-ui', 
      'Avenir', 
      'Helvetica', 
      'Arial', 
      'sans-serif'
    ].join(',')    
  },
  spacing: (factor: number) => `${0.25 * factor}rem`
});


export default theme;