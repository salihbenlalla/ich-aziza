import { AppProps } from 'next/app';
import '../styles/globals.css';

import { Provider } from 'react-redux';
import { store } from '../redux';
import theme from '../styles/MuiTheme';
import Navbar from '../components/navBar/Navbar';
import { ThemeProvider } from '@material-ui/styles';
import FirebaseAuthProvider from '../firebase/FirebaseAuthProvider';

function MyApp(props: AppProps) {
    const { Component, pageProps } = props;
    return (
        <Provider store={store}>
            <FirebaseAuthProvider>
                <ThemeProvider theme={theme}>
                    <Navbar>
                        <Component {...pageProps} />
                    </Navbar>
                </ThemeProvider>
            </FirebaseAuthProvider>
        </Provider>
    );
}

export default MyApp;
