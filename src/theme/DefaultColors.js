import { createTheme } from "@mui/material/styles";
import typography from "./Typography";
import { shadows } from "./Shadows";

const baselightTheme = createTheme({
  direction: 'ltr',
  palette: {
    primary: {
      main: '#285a9e',
      light: '#5c84c3',
      extraLight: 'rgb(236, 242, 255)',
      dark: '#1e3e67',
      contrastText: '#ffffff',
      contrast: '#5785D0'
    },
    secondary: {
      main: '#18244d',
      contrastText: '#ffffff',
      light: '#F4F5F9',
    },

    success: {
      main: '#09D880',
      light: '#c8fff4',
      dark: '#02b3a9',
      contrastText: '#ffffff',
      extraDark: '#00A15D'
    },
    info: {
      main: '#539BFF',
      light: '#EBF3FE',
      dark: '#1682d4',
      contrastText: '#ffffff',
    },
    error: {
      main: '#FF0000',
      light: '#FDEDE8',
      dark: '#f3704d',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#FFAE1F',
      light: '#FEF5E5',
      dark: '#ae8e59',
      contrastText: '#ffffff',
    },
    grey: {
      100: '#F2F6FA',
      200: '#EAEFF4',
      300: '#DFE5EF',
      400: '#7C8FAC',
      500: '#5A6A85',
      600: '#2A3547'
    },
    bg: {
      main: '#f4f5f9'
    },
    accent: {
      main:'#f48124',
      light: '#FDEDE8',
      dark: '#dd222b',
      extraDark: '#00A15D'
    },
    text: {
      main: '#3a3541',
      light:'#89868D',
      disabled: '#B4B2B7',
      white: '#fff'
    },
    action: {
      disabledBackground: 'rgba(73,82,88,0.12)',
      hoverOpacity: 0.02,
      hover: '#f6f9fc',
    },
    divider: '#e5eaef',
  },
  typography,
  shadows
},
  
);

export { baselightTheme };