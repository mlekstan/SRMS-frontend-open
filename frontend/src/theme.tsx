import { createTheme } from "@mui/material";


 const theme = createTheme({
  palette: {
    primary: {
      main: '#0a2117',
      light: '#399a6e',
      dark: '#3B4D45',
    },
    secondary: {
      main: '#d9d9d9',
      light: '#f3f3f3',
    }
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
})


export default theme;