import { AppProps } from 'next/app';
import '../styles/globals.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: `"Montserrat", "Lato", "Roboto", "Helvetica", "Arial", sans-serif"`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      light: '#19A463',
      main: '#1BB16B',
      dark: '#64E8AA',
      contrastText: '#fff',
    },
  },
});

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
